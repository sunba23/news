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

	router.Use(middleware.LoggingMiddleware)

	newsHandler := handler.NewsHandler{App: app}
	router.HandleFunc("/news", newsHandler.HandleAllNews).Methods(http.MethodGet)
	router.HandleFunc("/news/{id:[0-9]+}", newsHandler.HandleNewsByIndex).Methods(http.MethodGet)

	return router
}
