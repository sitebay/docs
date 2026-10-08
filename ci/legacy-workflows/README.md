# Retired deployment automation

These original workflows are retained as evidence, not active Actions files.
They depend on an unresolved theme revision and an absent theme-side index
writer. Their object-storage destinations and external delivery service were
not verified. The Pagefind build ships its search files with the site.

`test.yaml` builds and verifies the complete artifact without deployment
credentials. Publishing that artifact is a separate acceptance action. Existing
Algolia indexes are not deleted or modified by this migration.
