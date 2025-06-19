package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/sunba23/news/internal/news"
)

type NewsHandler struct {
	App news.App
}

func (nh *NewsHandler) HandleAllNews(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(news.JsonNews)
}

func (nh *NewsHandler) HandleNewsByIndex(w http.ResponseWriter, r *http.Request) {
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
