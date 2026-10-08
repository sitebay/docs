#!/usr/bin/env python3
"""Print local documentation routes for the browser regression suite."""
import json
import os
from pathlib import Path
import sys
from urllib.parse import urlsplit
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from publishing import ROOT, inventory
rows = inventory(ROOT,os.environ.get('HUGO_BIN','hugo'))
print(json.dumps(sorted({urlsplit(r['permalink']).path for r in rows if r['path'].startswith('articles/')})))
