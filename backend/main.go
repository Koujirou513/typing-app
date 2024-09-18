package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Echoインスタンスを作成
	e := echo.New()

	// CORSミドルウェアを使用
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))

	// ルートハンドラ
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, Typing App!")
	})

	// APIのエンドポイント
	e.GET("/api/typing", getTypingChallenge)

	// サーバーを起動
	e.Logger.Fatal(e.Start(":8080"))
}

func getTypingChallenge(c echo.Context) error {
	challenge := map[string]string{
		"text": "This is a typing challenge.",
	}
	return c.JSON(http.StatusOK, challenge)
}