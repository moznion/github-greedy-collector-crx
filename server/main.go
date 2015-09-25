package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

var ggcDir string
var port string

func ggcDirDefault() string {
	dir := "ggc"
	b, err := exec.Command("git", "config", "ghq.root").CombinedOutput()
	if err == nil {
		if dirs := strings.Split(string(b), "\n"); len(dirs) > 0 {
			dir = strings.TrimSpace(dirs[0])
		}
	}
	return dir
}

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
	flag.StringVar(&ggcDir, "dir", ggcDirDefault(), "Directory to save repositories")
	flag.BoolVar(&help, "help", false, "Show help")
	flag.Parse()

	if help {
		flag.Usage()
		os.Exit(0)
	}

	ggcDir, err := filepath.Abs(ggcDir)
	if err != nil {
		log.Fatal(err)
	}

	if _, err := os.Stat(ggcDir); os.IsNotExist(err) {
		if err := os.MkdirAll(ggcDir, 0777); err != nil {
			log.Fatal(err)
		}
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

	host := r.FormValue("host")
	owner := r.FormValue("owner")
	repo := r.FormValue("repo")

	if host == "" || owner == "" || repo == "" {
		w.WriteHeader(400)
		fmt.Fprintf(w, "Bad Request")
		return
	}

	url := fmt.Sprintf("git@%s:%s/%s", host, owner, repo)
	reposPath := filepath.Join(ggcDir, host, owner, repo)
	cmd := exec.Command("git", "clone", url, reposPath)

	log.Printf("Repository: %s/%s/%s", host, owner, repo)

	cmd.Start()
}
