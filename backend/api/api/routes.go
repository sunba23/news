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

	authHandler := handler.NewAuthHandler(app)
	newsHandler := handler.NewsHandler{App: app}

	authenticationMiddleware := middleware.NewAuthenticationMiddleware()
	userContextMiddleware := middleware.NewUserContextMiddleware(authHandler.SessionStore, app)

	router.Use(middleware.LoggingMiddleware, userContextMiddleware)
	router.HandleFunc("/", handler.HandleRoot)

	authSubRouter := router.PathPrefix("/auth/google").Subrouter()
	authSubRouter.HandleFunc("/login", authHandler.HandleGoogleLogin)
	authSubRouter.HandleFunc("/callback", authHandler.HandleGoogleCallback)
	authSubRouter.HandleFunc("/logout", authHandler.HandleLogout)

	newsSubRouter := router.PathPrefix("/news").Subrouter()
	newsSubRouter.HandleFunc("", newsHandler.HandleAllNews).Methods(http.MethodGet)
	newsSubRouter.HandleFunc("/{id:[0-9]+}", newsHandler.HandleNewsById).Methods(http.MethodGet)
	newsSubRouter.Use(authenticationMiddleware)

	return router
}
