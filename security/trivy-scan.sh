#!/usr/bin/env bash
# devops/security/trivy-scan.sh
set -euo pipefail
IMAGE=${1:-humesh/taxsim:latest}
echo "Scanning $IMAGE"
trivy image --severity HIGH,CRITICAL --exit-code 1 "$IMAGE" || echo "Trivy found issues (non-zero exit). Review output."
