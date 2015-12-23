package main
import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("OK")
	http.Handle("/", http.FileServer(http.Dir("./view")))
	http.ListenAndServe(":10000", nil)
}
