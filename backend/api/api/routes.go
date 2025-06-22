package api

import (
    "net/http"

    "github.com/gorilla/mux"
    "github.com/sunba23/news/api/handler"
    "github.com/sunba23/news/api/middleware"
    "github.com/sunba23/news/internal/news"
)

func NewHttpHandler(app news.App) http.Handler {
    router := mux.NewRouter()

    router.Use(func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            origin := r.Header.Get("Origin")
            if origin == "http://localhost:5173" {
                w.Header().Set("Access-Control-Allow-Origin", origin)
            }
            w.Header().Set("Access-Control-Allow-Credentials", "true")
            w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
            w.Header().Set("Access-Control-Expose-Headers", "Set-Cookie")
            
            if r.Method == "OPTIONS" {
                w.WriteHeader(http.StatusOK)
                return
            }
            
            next.ServeHTTP(w, r)
        })
    })

        authHandler := handler.NewAuthHandler(app)
    newsHandler := handler.NewsHandler{App: app}
    tagsHandler := handler.TagsHandler{App: app}
    userHandler := handler.UserHandler{App: app}

    authenticationMiddleware := middleware.NewAuthenticationMiddleware()
    userContextMiddleware := middleware.NewUserContextMiddleware(authHandler.SessionStore, app)

    router.Use(middleware.LoggingMiddleware, userContextMiddleware)
    router.HandleFunc("/", handler.HandleRoot)

    authSubRouter := router.PathPrefix("/auth/google").Subrouter()
    authSubRouter.HandleFunc("/login", authHandler.HandleGoogleLogin)
    authSubRouter.HandleFunc("/callback", authHandler.HandleGoogleCallback)
    authSubRouter.HandleFunc("/logout", authHandler.HandleLogout)

    router.HandleFunc("/auth/status", authHandler.HandleAuthStatus).Methods(http.MethodGet)

    newsSubRouter := router.PathPrefix("/news").Subrouter()
    newsSubRouter.Use(authenticationMiddleware)
    newsSubRouter.HandleFunc("", newsHandler.HandleGetAllNews).Methods(http.MethodGet)
    newsSubRouter.HandleFunc("/{id:[0-9]+}", newsHandler.HandleGetNewsById).Methods(http.MethodGet)
    newsSubRouter.HandleFunc("/{id:[0-9]+}/tags", newsHandler.HandleGetTagsForNews).Methods(http.MethodGet)

    tagsSubRouter := router.PathPrefix("/tags").Subrouter()
    tagsSubRouter.Use(authenticationMiddleware)
    tagsSubRouter.HandleFunc("", tagsHandler.HandleGetAllTags).Methods(http.MethodGet)
    tagsSubRouter.HandleFunc("/{id:[0-9]+}/news", tagsHandler.HandleGetNewsByTag).Methods(http.MethodGet)

    userSubRouter := router.PathPrefix("/user").Subrouter()
    userSubRouter.Use(authenticationMiddleware)
    userSubRouter.HandleFunc("/tags", userHandler.HandleGetFavoriteTags).Methods(http.MethodGet)
    userSubRouter.HandleFunc("/tags/{id:[0-9]+}", userHandler.HandleAddFavoriteTag).Methods(http.MethodPost)
    userSubRouter.HandleFunc("/tags/{id:[0-9]+}", userHandler.HandleDeleteFavoriteTag).Methods(http.MethodDelete)
    userSubRouter.HandleFunc("/news", userHandler.HandleGetFavoriteNews).Methods(http.MethodGet)

    return router
}