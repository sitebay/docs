"""Verify legacy-route expectations against generated Hugo alias pages."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]

class Alias(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonical = None; self.refresh = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta' and a.get('http-equiv', '').lower() == 'refresh':
            m = re.search(r';\s*url=(.+)$', a.get('content', ''), re.I)
            if m: self.refresh = m[1].strip()

def check(output, routes):
    problems = []
    def file(route):
        if not route.startswith('/docs/') or '..' in route.split('/'):
            raise ValueError('Redirect route must be inside /docs/')
        return output / route.removeprefix('/docs/') / 'index.html'
    for old, new in routes.items():
        try:
            alias = Alias(); alias.feed(file(old).read_text())
            expected = 'https://www.sitebay.org' + new
            if alias.canonical != expected or alias.refresh != expected:
                problems.append(f'{old}: wrong canonical or refresh target')
            if not file(new).is_file(): problems.append(f'{old}: missing destination {new}')
        except (OSError, ValueError) as error: problems.append(f'{old}: {error}')
    return problems

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--public-dir', type=Path, default=ROOT/'public')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    routes = json.loads((ROOT/'ci/expected-redirects.json').read_text())
    issues = check(args.public_dir, routes)
    result = {'checked': len(routes), 'issues': issues, 'routes': routes}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result))
    raise SystemExit(1 if issues else 0)
