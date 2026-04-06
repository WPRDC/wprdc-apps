#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")/../../.."

LOG_DIR="tools/etl/parcels-solr/logs"
mkdir -p "$LOG_DIR"

docker compose --profile parcels-n-at --profile etl run --rm etl \
  >> "$LOG_DIR/$(date +%Y-%m).log" 2>&1