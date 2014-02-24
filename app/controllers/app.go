package controllers

import "github.com/robfig/revel"

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	greeting := "The History of Life"
  return c.Render(greeting)
}

func (c App) Hello(form_value string) revel.Result {
  c.Validation.Required(form_value).Message("You Have to Input A Name!")
  c.Validation.MinSize(form_value, 2).Message("Name should be more than 1 letters!")

  if c.Validation.HasErrors() {
    c.Validation.Keep()
    c.FlashParams()
    return c.Redirect(App.Index)
  }

  return c.Render(form_value)
}
