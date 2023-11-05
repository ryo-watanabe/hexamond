package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"os"
	"flag"
	//"strconv"
	"io"
	"bufio"
	"crypto/subtle"
	"math/rand"
	"time"
)

type HexamondRequest struct {
	Action string	`json:"action"`
	Board *HexamondBoard	`json:"board,omitempty"`
}

type QuoridorResponse struct {
	Status string	`json:"status"`
	Board *HexamondBoard	`json:"board,omitempty"`
	Message string	`json:"message,omitempty"`
}

func action(req *QuoridorRequest, ret *QuoridorResponse) error {
	return nil
}

func apiRequest(w http.ResponseWriter, r *http.Request) {
	ret := QuoridorResponse{Status:"OK", Message:""}
	request := ""

	// JSON return
	defer func() {
		// result
		outjson,err := json.Marshal(ret)
		if err != nil {
			fmt.Println(err) //TODO: change to log
		}
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprint(w, string(outjson))
	}()

	// type check
	if r.Method != "POST" {
		ret.Status = "NG"
		ret.Message = "Not POST method"
		return
	}

	// request body
	rb := bufio.NewReader(r.Body)
	for {
		s, err := rb.ReadString('\n')
		request = request + s
		if err == io.EOF { break }
	}

	// JSON parse
	var req HexamondRequest
	b := []byte(request)
	err := json.Unmarshal(b, &req)
	if err != nil {
		ret.Status = "NG"
		ret.Message = "JSON parse error."
		return
	}

	// do action
	err = action(&req, &ret)
	if err != nil {
		ret.Status = "NG"
		ret.Message = err.Error()
		return
	}

}

func BasicAuth(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, pass, ok := r.BasicAuth()
		if !ok || subtle.ConstantTimeCompare([]byte(user), []byte(username)) != 1 || subtle.ConstantTimeCompare([]byte(pass), []byte(password)) != 1 {
			w.Header().Set("WWW-Authenticate", `Basic realm="`+realm+`"`)
			w.WriteHeader(401)
			w.Write([]byte("Unauthorised.\n"))
			return
		}
		handler(w, r)
	}
}

var (
	realm = "Please enter your username and password"
	contentsPath, username, password string
)

func main() {
	flag.StringVar(&contentsPath, "contents-path", "/contents", "Set static contents path")
	flag.StringVar(&username, "username", "user", "Basic auth username")
	flag.StringVar(&password, "password", "pass", "Basic auth password")
	flag.Parse()

	// route handler
	http.HandleFunc("/api/", BasicAuth(apiRequest))

	// route contents
	http.HandleFunc("/", BasicAuth(func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir(contentsPath)).ServeHTTP(w, r)
	}))

	// do serve
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
