"""Build nonindexable legacy bookmarks without adding them to article sources."""
from __future__ import annotations
import argparse
import html
import json
import re
import tomllib
from pathlib import Path
from urllib.parse import urljoin
from publishing import ROOT, output_file

MARKER = '<!-- SiteBay compatibility redirect -->'

def build(root: Path, public: Path) -> dict:
    base = tomllib.loads((root / 'config.toml').read_text())['baseURL']
    public = public.resolve()
    routes = json.loads((root / 'data/legacy-doc-routes.json').read_text())
    if not isinstance(routes, dict) or not routes:
        raise ValueError('Legacy route map must be nonempty')
    planned = []
    for old, new in routes.items():
        for route in (old, new):
            if not isinstance(route, str) or not re.fullmatch(r'/[a-z0-9_/-]+/', route):
                raise ValueError('Invalid redirect path')
        if old == new or new in routes:
            raise ValueError('Self redirect or redirect chain')
        target = output_file(public, base, urljoin(base, old))
        destination = output_file(public, base, urljoin(base, new))
        if target is None or destination is None or not destination.is_file():
            raise ValueError('Missing or out-of-scope redirect destination')
        if target.exists() and MARKER not in target.read_text():
            raise ValueError('Legacy route collides with existing output; build in a fresh destination')
        safe = html.escape(urljoin(base, new), quote=True)
        text = (f'<!doctype html>{MARKER}<html lang="en"><head><meta charset="utf-8">'
                '<meta name="robots" content="noindex"><title>Sorti documentation</title>'
                f'<link rel="canonical" href="{safe}"><meta http-equiv="refresh" content="0; url={safe}">'
                f'</head><body><p>This page moved to <a href="{safe}">Sorti documentation</a>.</p></body></html>\n')
        planned.append((target, text))
    for target, text in planned:
        target.parent.mkdir(parents=True, exist_ok=True)
        temporary = target.with_suffix('.redirect-tmp')
        if temporary.exists() or temporary.is_symlink():
            raise ValueError('Temporary redirect output already exists')
        temporary.write_text(text)
        temporary.replace(target)
    return {'redirects': len(routes), 'scope': 'Compatibility URLs only; no authored or indexed document.'}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--public-dir', type=Path, default=ROOT/'public')
    args = parser.parse_args()
    print(json.dumps(build(ROOT, args.public_dir)))
