// Package searchconfig reads the site-owned search identities used by Hugo.
// Admin utilities must not carry defaults copied from an upstream tenant.
package searchconfig

import (
	"fmt"
	"strings"

	"github.com/pelletier/go-toml"
)

type Config struct {
	AppID              string
	MetaIndex          string
	DocumentationIndex string
	APIIndex           string
	Tree               *toml.Tree
}

type Index struct {
	Name    string `json:"name"`
	Source  string `json:"source"`
	Replace bool   `json:"replace"`
}

func Load(filename string) (Config, error) {
	tree, err := toml.LoadFile(filename)
	if err != nil {
		return Config{}, fmt.Errorf("read search config: %w", err)
	}
	value := func(key string) string {
		result, _ := tree.Get(key).(string)
		return strings.TrimSpace(result)
	}
	result := Config{AppID: value("params.search_config.app_id"), MetaIndex: value("params.search_config.meta_index"), Tree: tree}
	sections, ok := tree.Get("params.search_config.sections").([]*toml.Tree)
	if !ok {
		return Config{}, fmt.Errorf("search_config.sections must be an array")
	}
	for _, section := range sections {
		index, _ := section.Get("index").(string)
		switch section.Get("name") {
		case "guides":
			result.DocumentationIndex = index
		case "api":
			result.APIIndex = index
		}
	}
	if result.AppID == "" || result.MetaIndex == "" || result.DocumentationIndex == "" || result.APIIndex == "" {
		return Config{}, fmt.Errorf("search config requires application, metadata, guides and API index identities")
	}
	// The two supported config schemas must agree at their shared boundaries.
	for key, expected := range map[string]string{
		"params.search_config2.app_id":                  result.AppID,
		"params.search_config2.meta_index":              result.MetaIndex,
		"params.search_config2.sections.guides.index":   result.DocumentationIndex,
		"params.search_config2.sections.products.index": result.DocumentationIndex,
		"params.search_config2.sections.api.index":      result.APIIndex,
	} {
		if value(key) != expected {
			return Config{}, fmt.Errorf("search identity mismatch at %s", key)
		}
	}
	return result, nil
}

func (c Config) Indices(suffix string) []Index {
	return []Index{
		{Name: c.DocumentationIndex + suffix, Source: "index.json", Replace: true},
		{Name: c.MetaIndex + suffix, Source: "data/sections/index.json", Replace: false},
		{Name: c.APIIndex + suffix, Source: "api/index.json", Replace: true},
	}
}
