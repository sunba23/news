package news

import "github.com/sunba23/news/config"

type App interface {
	Config() *config.Config
}

// For now just config, but will hold external dependencies as well
type Application struct {
	config *config.Config
}

func (app *Application) Config() *config.Config {
	return app.config
}

func NewApplication(conf *config.Config) (*Application, error) {
	app := Application{
		config: conf,
	}
	return &app, nil
}
