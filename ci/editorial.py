"""Run every existing Blueberry rule against articles; fail on new editorial debt.

The baseline is recomputed from the reviewed, immutable commit, not from current
files or an adjustable error count. Run without --baseline for the strict full
legacy editorial report. Publishing correctness never uses this baseline.
"""
from __future__ import annotations

import argparse
from collections import Counter
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re
import subprocess
import tarfile
import tempfile

import blueberry
from publishing import ROOT, parse_metadata


def canonical(source: str) -> str:
    return re.sub(r'/(?:_?index)\.md$', '/', source)


def collect(root: Path, relocations: dict[str, str] | None = None) -> Counter:
    result = Counter()
    files = sorted((root / 'articles').rglob('*.md'))
    relocations = relocations or {}
    files += [root / name for name in relocations if (root / name).is_file()]
    if not files:
        raise ValueError('No editorial sources discovered')
    blueberry.WORKING_DIR = str(root)
    for path in files:
        source = path.relative_to(root).as_posix()
        source = canonical(relocations.get(source, source))
        metadata, body = parse_metadata(path.read_text())
        kwargs = {'filename': str(path)}
        for kind, value in [('filepath', path), ('file_yaml', metadata)]:
            for rule in blueberry._validate[kind]:
                issue = rule(value, **kwargs) if kind != 'filepath' else rule(value)
                if issue:
                    result[(source, rule.__name__, str(issue[-1]), '')] += 1
        for number, line in enumerate(body.splitlines(), 1):
            for rule in blueberry._validate['line']:
                issue = rule(line, line_num=number, **kwargs)
                if issue:
                    context = sha256(line.encode()).hexdigest()
                    result[(source, rule.__name__, str(issue[-1]), context)] += 1
    return result


def historic(root: Path, specification: Path) -> Counter:
    spec = json.loads(specification.read_text())
    revision = spec['revision']
    if not re.fullmatch(r'[0-9a-f]{40}', revision):
        raise ValueError('Editorial baseline must name an immutable full commit SHA')
    relocations = spec.get('relocations', {})
    data = subprocess.check_output(['git', 'archive', revision, 'articles', *relocations], cwd=root)
    with tempfile.TemporaryDirectory(prefix='sitebay-editorial-') as directory:
        target = Path(directory)
        with tarfile.open(fileobj=BytesIO(data)) as archive:
            for member in archive.getmembers():
                path = (target / member.name).resolve()
                if not path.is_relative_to(target) or not member.isfile():
                    continue
                path.parent.mkdir(parents=True, exist_ok=True)
                with archive.extractfile(member) as stream:
                    path.write_bytes(stream.read())
        return collect(target, relocations)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', type=Path)
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    current = collect(ROOT)
    baseline = historic(ROOT, args.baseline) if args.baseline else Counter()
    new = current - baseline
    report = {'existing_findings': sum((current & baseline).values()), 'new_findings': sum(new.values()),
              'findings': [dict(source=k[0], rule=k[1], detail=k[2], context_hash=k[3], count=v,
                                new_count=new[k]) for k, v in sorted(current.items())]}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2) + '\n')
    print(f"Editorial findings: {sum(current.values())}; existing at baseline: {report['existing_findings']}; new: {report['new_findings']}")
    for (source, rule, detail, _), count in sorted(new.items()):
        print(f'{source}: {rule}: {detail} ({count})')
    return 1 if new else 0


if __name__ == '__main__':
    raise SystemExit(main())
