#!/usr/bin/env bash
set -euo pipefail

check() {
  local name="$1"
  local url="$2"
  if curl -fsS "$url" >/dev/null; then
    echo "OK   $name -> $url"
  else
    echo "FAIL $name -> $url"
    return 1
  fi
}

check "api-gateway" "http://localhost:3000/health"
check "user-service" "http://localhost:3001/health"
check "order-service" "http://localhost:3002/health"
check "payment-service" "http://localhost:3003/health"
check "notification-service" "http://localhost:3004/health"
