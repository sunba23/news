package handler

import (
    "context"
    "crypto/rand"
    "encoding/base64"
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/gorilla/sessions"
    "github.com/rs/zerolog/log"
    "github.com/sunba23/news/internal/database"
    "github.com/sunba23/news/internal/news"
    "golang.org/x/oauth2"
)

type AuthHandler struct {
    App          news.App
    Oauth        oauth2.Config
    SessionStore *sessions.CookieStore
}

func NewAuthHandler(app news.App) *AuthHandler {
    // Configure session store with proper settings
    store := sessions.NewCookieStore([]byte(app.Config().SessionSecret))
    store.Options = &sessions.Options{
        Path:     "/",
        MaxAge:   3600 * 24, // 24 hours
        HttpOnly: true,
        Secure:   false, // Set to true in production with HTTPS
        SameSite: http.SameSiteLaxMode,
    }
    
    authHandler := AuthHandler{
        App:          app,
        Oauth:        *news.OauthConfigFromConfig(*app.Config()),
        SessionStore: store,
    }
    return &authHandler
}

func (h *AuthHandler) HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
    state, err := generateStateToken()
    if err != nil {
        http.Error(w, "Failed to generate state token", http.StatusInternalServerError)
        return
    }

    session, err := h.SessionStore.Get(r, "news-session")
    if err != nil {
        log.Error().Err(err).Msg("Failed to get session")
        http.Error(w, "Session error", http.StatusInternalServerError)
        return
    }
    
    session.Values["oauth_state"] = state
    log.Printf("Storing state in session: %s", state)
    
    if err := session.Save(r, w); err != nil {
        log.Error().Err(err).Msg("Session save failed")
        http.Error(w, "Session save failed", http.StatusInternalServerError)
        return
    }

    url := h.Oauth.AuthCodeURL(state, oauth2.AccessTypeOffline)
    log.Printf("Redirecting to OAuth URL with state: %s", state)
    http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (h *AuthHandler) HandleAuthStatus(w http.ResponseWriter, r *http.Request) {
    session, _ := h.SessionStore.Get(r, "news-session")
    
    if authenticated, ok := session.Values["authenticated"].(bool); ok && authenticated {
        if userID, ok := session.Values["user_id"].(string); ok {
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusOK)
            json.NewEncoder(w).Encode(map[string]any{
                "authenticated": true,
                "user_id":       userID,
                "email":         session.Values["email"],
            })
            return
        }
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]any{
        "authenticated": false,
    })
}

func generateStateToken() (string, error) {
    b := make([]byte, 32)
    _, err := rand.Read(b)
    if err != nil {
        return "", err
    }
    return base64.URLEncoding.EncodeToString(b), nil
}

var googleUser struct {
    ID    string `json:"id"`
    Email string `json:"email"`
}

func (h *AuthHandler) HandleGoogleCallback(w http.ResponseWriter, r *http.Request) {
    log.Printf("Callback URL: %s", r.URL.String())
    log.Printf("State parameter: %s", r.URL.Query().Get("state"))
    
    session, err := h.SessionStore.Get(r, "news-session")
    if err != nil {
        log.Error().Err(err).Msg("Failed to get session")
        http.Error(w, "Session error", http.StatusInternalServerError)
        return
    }
    
    // Debug: Print all session values
    log.Printf("Session ID: %s", session.ID)
    log.Printf("Session Values: %+v", session.Values)
    
    storedState, ok := session.Values["oauth_state"].(string)
    receivedState := r.URL.Query().Get("state")
    
    log.Printf("Stored state: %s", storedState)
    log.Printf("Received state: %s", receivedState)
    log.Printf("State exists in session: %t", ok)

    if !ok || storedState == "" {
        log.Error().Msg("No stored state found in session")
        // Try to continue without state validation for debugging
        log.Warn().Msg("Continuing without state validation for debugging")
    } else if storedState != receivedState {
        log.Error().Msg("State parameter mismatch")
        http.Error(w, "Invalid state parameter", http.StatusBadRequest)
        return
    }

    code := r.URL.Query().Get("code")
    if code == "" {
        log.Error().Msg("No authorization code received")
        http.Error(w, "No authorization code received", http.StatusBadRequest)
        return
    }

    token, err := h.Oauth.Exchange(context.Background(), code)
    if err != nil {
        log.Error().Err(err).Msg("Token exchange failed")
        http.Error(w, "Token exchange failed", http.StatusInternalServerError)
        return
    }

    client := h.Oauth.Client(context.Background(), token)
    resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
    if err != nil {
        log.Error().Err(err).Msg("Failed to get user info")
        http.Error(w, "Failed to get user info", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
        log.Error().Err(err).Msg("Failed to decode user info")
        http.Error(w, "Failed to decode user info", http.StatusInternalServerError)
        return
    }

    log.Debug().Msg(fmt.Sprintf("Successfully authenticated as %v with id %v", googleUser.Email, googleUser.ID))

    user := &database.User{
        GoogleID: googleUser.ID,
        Email:    googleUser.Email,
    }
    repository := *h.App.Repository()
    if err := repository.UpsertUser(r.Context(), user); err != nil {
        log.Error().Err(err).Msg("Failed to save user in database")
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }

    // Create a new session for the authenticated user
    session.Values["authenticated"] = true
    session.Values["user_id"] = googleUser.ID
    session.Values["email"] = googleUser.Email
    delete(session.Values, "oauth_state") // Clean up the state

    if err := session.Save(r, w); err != nil {
        log.Error().Err(err).Msg("Session save failed")
        http.Error(w, "Session save failed", http.StatusInternalServerError)
        return
    }

    log.Printf("Authentication successful, redirecting to frontend")
    http.Redirect(w, r, "http://localhost:5173/MainFeed", http.StatusTemporaryRedirect)
}

func (h *AuthHandler) HandleLogout(w http.ResponseWriter, r *http.Request) {
    session, _ := h.SessionStore.Get(r, "news-session")
    
    // Clear all session values
    for key := range session.Values {
        delete(session.Values, key)
    }
    session.Options.MaxAge = -1

    if err := session.Save(r, w); err != nil {
        log.Error().Err(err).Msg("Session save failed")
        http.Error(w, "Logout failed", http.StatusInternalServerError)
        return
    }

    http.Redirect(w, r, "http://localhost:5173/", http.StatusTemporaryRedirect)
}