#!/usr/bin/env python3
"""Validate links against actual Hugo output instead of guessing from folders.

Build first, then: python ci/check-links.py --public-dir public
All source validation and expected-page checks are deliberately included.
"""
from publishing import main

if __name__ == '__main__':
    raise SystemExit(main())
