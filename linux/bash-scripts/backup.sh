#!/usr/bin/env bash
# devops/linux/bash-scripts/backup.sh
set -euo pipefail
BACKUP_DIR="$HOME/devops-backups"
PROJECT_DIR="$HOME/projects/TaxSim-2425"
DATE=$(date +"%F_%H-%M-%S")
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/taxsim-$DATE.tar.gz" -C "$PROJECT_DIR" .
find "$BACKUP_DIR" -type f -mtime +14 -delete
echo "Backup saved: $BACKUP_DIR/taxsim-$DATE.tar.gz"
