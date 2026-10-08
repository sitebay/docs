// usr/bin/env go run -mod=readonly "$0" "$@"; exit "$?"
package main

import (
	"github.com/sitebay/docs/scripts/internal/searchconfig"
	"log"

	"github.com/alexflint/go-arg"
	"github.com/algolia/algoliasearch-client-go/v3/algolia/opt"
	"github.com/algolia/algoliasearch-client-go/v3/algolia/search"
)

var (
	version = "v0.6"
)

type config struct {
	ConfigFile string `arg:"--config" default:"../../config.toml" help:"site-owned Hugo config"`
	Filters    string `arg:"required" help:"filter to delete by (see https://www.algolia.com/doc/api-reference/api-methods/delete-by/)"`
	AppKey     string `arg:"env:ALGOLIA_ADMIN_API_KEY"`
	AppID      string `arg:"env:ALGOLIA_APP_ID"`
}

func (config) Version() string {
	return "clean_linode_sections_index " + version
}

// This programs deletes rows in the sections mapping index matching the given filters.
//
// Usage:
//
//	ALGOLIA_ADMIN_API_KEY=<mysecret> clean_linode_sections_index --filters section:docs
func main() {
	log.SetPrefix("algolia: ")
	log.SetFlags(log.Flags() &^ (log.Ldate | log.Ltime))

	var cfg config

	p := arg.MustParse(&cfg)
	project, err := searchconfig.Load(cfg.ConfigFile)
	if err != nil {
		log.Fatal(err)
	}

	if cfg.AppKey == "" {
		p.Fail("An Algolia admin API key must be provided either in the ALGOLIA_ADMIN_API_KEY OS environment variable or in --appkey.")
	}
	if cfg.AppID == "" {
		cfg.AppID = project.AppID
	}

	client := search.NewClient(cfg.AppID, cfg.AppKey)

	index := client.InitIndex(project.MetaIndex)

	log.Printf("DeleteBy %q", cfg.Filters)

	res, err := index.DeleteBy(opt.Filters(cfg.Filters))
	if err != nil {
		log.Fatal(err)
	}

	if err := res.Wait(); err != nil {
		log.Fatal(err)
	}

	log.Println("Done.")
}
