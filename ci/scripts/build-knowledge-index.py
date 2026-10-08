#!/usr/bin/env python3
"""Generate the opted-in knowledge index from Markdown and actual Hugo routes."""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import re
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from publishing import ROOT, inventory, parse_metadata


def build_index(root: Path, routes: dict[str,str]) -> list[dict]:
    result = []
    for article in sorted((root/'articles').rglob('*.md')):
        metadata, body = parse_metadata(article.read_text())
        if metadata.get('bible') is not True:
            continue
        source = article.relative_to(root).as_posix()
        if source not in routes or not body.strip():
            raise ValueError(f'Curated article is empty or not published: {source}')
        def resolve_link(match):
            destination = 'articles/' + match.group(1).lstrip('/')
            if destination not in routes:
                raise ValueError(f'Unresolved knowledge link: {source}: {destination}')
            return routes[destination]
        body = re.sub(r'{{<\s*relref\s+"([^"]+)"\s*>}}',resolve_link,body)
        legacy = article.relative_to(root/'articles').as_posix()
        legacy = re.sub(r'/(?:_?index)\.md$','',legacy).removesuffix('.md')
        result.append({'title':metadata['title'],'description':metadata['description'],
            'path':legacy,'url':routes[source],'file':source,'content':body.strip()})
    if not result:
        raise ValueError('No curated articles discovered')
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--hugo',default=os.environ.get('HUGO_BIN','hugo'))
    parser.add_argument('--write',action='store_true')
    parser.add_argument('--check',action='store_true')
    args = parser.parse_args()
    routes = {row['path']:row['permalink'] for row in inventory(ROOT,args.hugo)}
    text = json.dumps(build_index(ROOT,routes),indent=2)+'\n'
    target = ROOT/'articles/bible-index.json'
    if args.check:
        if target.read_text() != text:
            parser.exit(1,'Curated knowledge index is stale; regenerate it\n')
        print('Curated knowledge index matches article sources')
    elif args.write:
        target.write_text(text)
        print('Updated curated knowledge index')
    else:
        print(text,end='')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
