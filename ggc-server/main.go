package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
)

var ggcDir string
var port string

func main() {
	flag.Usage = func() {
		fmt.Printf(`Usage:
  ./ggc-server

Options:
`)
		flag.PrintDefaults()
	}

	var help bool
	flag.StringVar(&port, "port", "8080", "Port for listen")
	flag.StringVar(&ggcDir, "dir", "ggc", "Directory to save repositories")
	flag.BoolVar(&help, "help", false, "Show help")
	flag.Parse()

	if help {
		flag.Usage()
		os.Exit(0)
	}

	if err := os.MkdirAll(ggcDir, 0777); err != nil {
		log.Fatal(err)
	}
	log.Printf("Accepting connections at http://localhost:%s/", port)
	log.Printf("Use base directory: %s", ggcDir)

	http.HandleFunc("/", gitClone)
	http.ListenAndServe(":"+port, nil)
}

func gitClone(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s %s %s", r.Proto, r.Method, r.URL, r.Header)

	if r.Method != "POST" {
		w.WriteHeader(404)
		fmt.Fprintf(w, "Not Found")
		return
	}

	proto := r.FormValue("proto")
	host := r.FormValue("host")
	owner := r.FormValue("owner")
	repo := r.FormValue("repo")

	if proto == "" || host == "" || owner == "" || repo == "" {
		w.WriteHeader(400)
		fmt.Fprintf(w, "Bad Request")
		return
	}

	url := fmt.Sprintf("%s://%s/%s/%s", proto, host, owner, repo)
	reposPath := filepath.Join(ggcDir, host, owner, repo)
	cmd := exec.Command("git", "clone", url, reposPath)

	log.Printf("Repository: %s/%s/%s", host, owner, repo)

	cmd.Start()
}
