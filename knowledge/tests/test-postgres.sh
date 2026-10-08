#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
name="sitebay-docs-test-$(date +%s)-$$"
image="pgvector/pgvector:0.8.7-pg17-bookworm"
container=''
cleanup(){ if [[ -n "$container" ]]; then docker rm -f "$container" >/dev/null; fi; }
trap cleanup EXIT
host_port=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')
container=$(docker create --name "$name" --memory 512m --cpus 1 --label sitebay.docs-test=true --publish "127.0.0.1:$host_port:5432" --env POSTGRES_PASSWORD=disposable-test-only --env POSTGRES_DB=docs_test "$image")
docker start "$container" >/dev/null
for attempt in $(seq 1 50); do if docker exec "$container" pg_isready -h 127.0.0.1 -U postgres -d docs_test >/dev/null 2>&1; then break; fi; sleep 1; done
docker exec "$container" pg_isready -h 127.0.0.1 -U postgres -d docs_test >/dev/null
port=$(docker inspect --format '{{(index (index .NetworkSettings.Ports "5432/tcp") 0).HostPort}}' "$container")
DOCS_TEST_OWNER_URL="postgresql://postgres:disposable-test-only@127.0.0.1:$port/docs_test" \
DOCS_TEST_READER_URL="postgresql://docs_test_reader:disposable-reader-only@127.0.0.1:$port/docs_test" \
node "$root/tests/postgres.integration.mjs"
