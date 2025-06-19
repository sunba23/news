package main

import (
	"github.com/rs/zerolog/log"
	"github.com/sunba23/news/config"
	"github.com/sunba23/news/internal/news"
)

func main() {
	conf, err := config.InitConfig()
	if err != nil {
		log.Fatal().Err(err).Send()
	}

	SetUp(conf)

	app, err := news.NewApplication(conf)
	if err != nil {
		log.Fatal().Err(err).Send()
	}

	err = RunServer(app)
	if err != nil {
		log.Fatal().Err(err).Send()
	}
}
