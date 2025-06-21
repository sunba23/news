package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/zerolog/log"
	"github.com/sunba23/news/api/middleware"
	"github.com/sunba23/news/internal/database"
	"github.com/sunba23/news/internal/news"
)

type NewsHandler struct {
	App news.App
}

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome 2 newsapp"))
}

func (h *NewsHandler) HandleAllNews(w http.ResponseWriter, r *http.Request) {
	user, ok := r.Context().Value(middleware.UserContextKey).(*database.User)
	if !ok || user == nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	log.Info().Msg("viewing all news; authenticated - user existing in db")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(news.JsonNews)
}

func (h *NewsHandler) HandleNewsById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid news id", http.StatusBadRequest)
		return
	}

	item, ok := news.GetNewsById(id)
	if !ok {
		http.Error(w, "news not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}
