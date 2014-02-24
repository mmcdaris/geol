package controllers

import "github.com/robfig/revel"

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	greeting := "Hello From the app!"
  return c.Render(greeting)
}
