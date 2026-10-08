#!/usr/bin/env python3
"""Require an active spelling rule, then check the complete article tree."""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--vale',default='vale')
parser.add_argument('--report',type=Path,default=ROOT/'.cache/spelling.json')
args=parser.parse_args()
# Negative fixture proves a renamed/missing ruleset cannot silently pass.
with tempfile.TemporaryDirectory() as directory:
    bad=Path(directory)/'negative.md';bad.write_text('This sentance contains misspelllng.\n')
    result=subprocess.run([args.vale,'--config',str(ROOT/'.vale.ini'),'--output=JSON',str(bad)],cwd=ROOT,text=True,capture_output=True)
    findings=json.loads(result.stdout)
    if result.returncode == 0 or not any(r['Check']=='SiteBay.Spelling' for rows in findings.values() for r in rows):
        raise SystemExit('Spelling negative control failed: the active rules must reject known misspellings')
result=subprocess.run([args.vale,'--output=JSON','articles'],cwd=ROOT,text=True,capture_output=True)
args.report.parent.mkdir(parents=True,exist_ok=True);args.report.write_text(result.stdout)
if result.stderr:print(result.stderr)
print('Spelling negative control passed; complete article check exit:',result.returncode)
raise SystemExit(result.returncode)
