#!/usr/bin/env python3
"""Extract the selected public operation catalog; never import runtime services."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PREFIX = '/f/api/v1'
GROUPS = ('account','application_password','domains','event','images','invite','plan','region','site_live','site_stage','team','template','ticket','utils')
METHODS = {'get','post','patch','put','delete'}


def included(group: str, path: str, method: str, operation: dict) -> bool:
    tags = operation.get('tags', [])
    suffix = path.removeprefix(PREFIX)
    if not path.startswith(PREFIX + '/'):
        return False
    if any(term in path for term in ['/admin/','/internal/','test_harness','/hosting/creation','replay-mutation-log']):
        return False
    if group == 'account':
        return suffix in ('/account/me','/account/me/extended','/api-keys','/api-keys/@current','/api-keys/{key_id}')
    if group == 'domains':
        return any(suffix.startswith(x) for x in ('/domain','/site/{fqdn}/dns','/site/{fqdn}/custom_hostname','/site/{fqdn}/ns_status'))
    if group == 'images':
        return suffix == '/site_live/{fqdn}/images' and method == 'get'
    if group == 'site_live':
        return suffix.startswith('/site/') and '/stage' not in path and path.count('/') <= 7
    if group == 'site_stage':
        return suffix.startswith('/site/{fqdn}/stage')
    if group == 'team':
        return 'team' in tags and path.count('/') <= 7 and 'agent' not in path
    if group == 'template':
        return 'template' in tags and method == 'get'
    if group == 'utils':
        return suffix in ('/site/{fqdn}/legal_actions','/site/{fqdn}/read_state','/site/{fqdn}/tools')
    return group in tags


def make_catalog(raw: bytes) -> dict:
    spec = json.loads(raw)
    if not isinstance(spec.get('paths'), dict) or not spec['paths']:
        raise ValueError('OpenAPI contract must contain paths')
    records = []
    for group in GROUPS:
        for path, methods in spec['paths'].items():
            for method, operation in methods.items():
                if method not in METHODS or not included(group,path,method,operation):
                    continue
                parameters = [{'name':p['name'],'in':p['in'],'required':p.get('required',False)}
                              for p in operation.get('parameters',[]) if 'name' in p]
                required, schema_name = [], ''
                for content in operation.get('requestBody',{}).get('content',{}).values():
                    schema_name = content.get('schema',{}).get('$ref','').rsplit('/',1)[-1]
                    if schema_name:
                        required = spec.get('components',{}).get('schemas',{}).get(schema_name,{}).get('required',[])
                records.append({'group':group,'method':method.upper(),'path':path,
                    'summary':operation.get('summary','Operation'),'parameters':parameters,
                    'body_schema':schema_name,'required_body_fields':required,
                    'responses':list(operation.get('responses',{}))})
    if not records:
        raise ValueError('Contract contains no selected customer-facing operations')
    return {'source_sha256':hashlib.sha256(raw).hexdigest(),'operations':records}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,default=Path(os.environ.get('SITEBAY_OPENAPI',Path.home()/'sorti/packages/sitebay-client/generated/sitebay-openapi.json')))
    parser.add_argument('--destination',type=Path,default=ROOT/'data/sitebay_api_catalog.json')
    parser.add_argument('--check',action='store_true')
    args = parser.parse_args()
    try:
        catalog = make_catalog(args.source.read_bytes())
        rendered = json.dumps(catalog,indent=2)+'\n'
        if args.check:
            if args.destination.read_text() != rendered:
                raise ValueError('API catalog differs from the selected source; review and regenerate it')
        else:
            args.destination.parent.mkdir(parents=True,exist_ok=True)
            args.destination.write_text(rendered)
        print(f"API catalog {'matches' if args.check else 'updated'}: {len(catalog['operations'])} selected operation records")
        return 0
    except (OSError, ValueError) as error:
        parser.exit(1,str(error)+'\n')


if __name__ == '__main__':
    raise SystemExit(main())
