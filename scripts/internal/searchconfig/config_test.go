package searchconfig

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestSiteConfigAndSuffix(t *testing.T) {
	c, err := Load("../../../config.toml")
	if err != nil {
		t.Fatal(err)
	}
	if c.AppID != "VJRR3OCA19" {
		t.Fatalf("unexpected site application: %s", c.AppID)
	}
	got := c.Indices("-preview")
	want := []string{"sitebay-documentation-preview", "sitebay-documentation-sections-preview", "sitebay-documentation-api-preview"}
	for i, index := range got {
		if index.Name != want[i] {
			t.Fatalf("index %d: %s", i, index.Name)
		}
	}
	if got[1].Replace {
		t.Fatal("shared section metadata must never be replaced wholesale")
	}
}

func TestRefuseMissingOrMixedConfig(t *testing.T) {
	if _, err := Load("missing.toml"); err == nil {
		t.Fatal("accepted missing configuration")
	}
	data, err := os.ReadFile("../../../config.toml")
	if err != nil {
		t.Fatal(err)
	}
	// Change only the modern application identity, not the reference schema.
	text := string(data)
	marker := "[params.search_config2]"
	pos := strings.Index(text, marker)
	if pos < 0 {
		t.Fatal("missing runtime config")
	}
	text = text[:pos] + strings.Replace(text[pos:], "VJRR3OCA19", "OTHER-APP", 1)
	path := filepath.Join(t.TempDir(), "config.toml")
	if err := os.WriteFile(path, []byte(text), 0600); err != nil {
		t.Fatal(err)
	}
	if _, err := Load(path); err == nil {
		t.Fatal("accepted a mixed-tenant configuration")
	}
}
