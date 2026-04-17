#!/usr/bin/env sh
set -eu

BACKUP_DIR=${BACKUP_DIR:-/backups}
STAMP=$(date +"%Y%m%d-%H%M%S")
mkdir -p "$BACKUP_DIR"

pg_dump "$DATABASE_URL" | gzip > "$BACKUP_DIR/legisflow-$STAMP.sql.gz"
find "$BACKUP_DIR" -type f -name "legisflow-*.sql.gz" -mtime +14 -delete

