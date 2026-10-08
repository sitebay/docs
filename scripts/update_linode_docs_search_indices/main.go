// usr/bin/env go run -mod=readonly "$0" "$@"; exit "$?"
package main

import (
	"encoding/json"
	"github.com/sitebay/docs/scripts/internal/searchconfig"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/alexflint/go-arg"
	"github.com/algolia/algoliasearch-client-go/v3/algolia/search"
)

var (
	version = "v0.6"
)

type config struct {
	ConfigFile  string `arg:"--config" default:"../../config.toml" help:"site-owned Hugo config"`
	DryRun      bool   `arg:"--dry-run" help:"print destinations without reading credentials or contacting Algolia"`
	SourceDir   string `arg:"required" help:"filesystem path to read files relative from (e.g. /public)"`
	IndexSuffix string `default:"" help:"suffix to append to index names in Algolia"`
	AppKey      string `arg:"env:ALGOLIA_ADMIN_API_KEY"`
	AppID       string `arg:"env:ALGOLIA_APP_ID"`
}

func (config) Version() string {
	return "update_linode_docs_search_indices " + version
}

// This programs updates the Algolia indices defined below.
//
// Usage:
//
//	ALGOLIA_ADMIN_API_KEY=<mysecret> update_linode_docs_search_indices --sourcedir ../../public
//
// Also note that you need to build the site with Hugo first.
func main() {
	log.SetPrefix("algolia: ")
	log.SetFlags(log.Flags() &^ (log.Ldate | log.Ltime))

	var cfg config

	p := arg.MustParse(&cfg)

	project, err := searchconfig.Load(cfg.ConfigFile)
	if err != nil {
		log.Fatal(err)
	}
	if cfg.AppID == "" {
		cfg.AppID = project.AppID
	}
	indices := project.Indices(cfg.IndexSuffix)
	if cfg.DryRun {
		if err := json.NewEncoder(os.Stdout).Encode(struct {
			AppID   string               `json:"app_id"`
			Indices []searchconfig.Index `json:"indices"`
		}{cfg.AppID, indices}); err != nil {
			log.Fatal(err)
		}
		return
	}
	if cfg.AppKey == "" {
		p.Fail("An Algolia admin API key must be supplied via ALGOLIA_ADMIN_API_KEY or --appkey.")
	}

	client := search.NewClient(cfg.AppID, cfg.AppKey)

	for _, indexData := range indices {

		data, err := ioutil.ReadFile(filepath.Join(cfg.SourceDir, indexData.Source))
		if err != nil {
			log.Fatal(err)
		}

		var items []map[string]interface{}
		if err := json.Unmarshal(data, &items); err != nil {
			log.Fatal(err)
		}

		if len(items) == 0 {
			log.Fatalf("No data found for index %q, abort.", indexData.Name)
		}

		log.Printf("Update %q with %d rows...\n", indexData.Name, len(items))

		index := client.InitIndex(indexData.Name)

		if indexData.Replace {
			res, err := index.ReplaceAllObjects(items)
			if err != nil {
				log.Fatal(err)
			}

			if err := res.Wait(); err != nil {
				log.Fatal(err)
			}

		} else {
			groups, err := index.SaveObjects(items)
			if err != nil {
				log.Fatal(err)
			}

			for _, res := range groups.Responses {
				if err := res.Wait(); err != nil {
					log.Fatal(err)
				}
			}
		}

	}

	log.Println("Done.")
}
