#!/usr/bin/env bash
set -euo pipefail

# Usage:
# SYSTEM_BASE_URL="https://n8n.azoth.cloud" PEDAGO_BASE_URL="https://pedago.azoth.cloud" ./test-webhooks.sh
# Optional:
# WEBHOOK_SECRET="your-secret"

SYSTEM_BASE_URL="${SYSTEM_BASE_URL:-https://n8n.azoth.cloud}"
PEDAGO_BASE_URL="${PEDAGO_BASE_URL:-https://pedago.azoth.cloud}"
WEBHOOK_SECRET="${WEBHOOK_SECRET:-}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

header_args=()
if [[ -n "${WEBHOOK_SECRET}" ]]; then
  header_args=(-H "x-seve-webhook-secret: ${WEBHOOK_SECRET}")
fi

run_test() {
  local label="$1"
  local url="$2"
  local payload_file="$3"

  echo "== ${label} =="
  echo "POST ${url}"
  echo "payload: ${payload_file}"

  curl -sS -X POST \
    -H "content-type: application/json" \
    "${header_args[@]}" \
    --data-binary @"${payload_file}" \
    "${url}" \
    | sed -n '1,120p'

  echo
}

run_test \
  "SYSTEM chat_message" \
  "${SYSTEM_BASE_URL}/webhook/seve/system/session-events" \
  "${ROOT_DIR}/payloads/system/chat_message.json"

run_test \
  "SYSTEM seed_selected" \
  "${SYSTEM_BASE_URL}/webhook/seve/system/session-events" \
  "${ROOT_DIR}/payloads/system/seed_selected.json"

run_test \
  "PEDAGO chat_message" \
  "${PEDAGO_BASE_URL}/webhook/seve/pedago/session-events" \
  "${ROOT_DIR}/payloads/pedago/chat_message.json"

run_test \
  "PEDAGO exercise_submission" \
  "${PEDAGO_BASE_URL}/webhook/seve/pedago/session-events" \
  "${ROOT_DIR}/payloads/pedago/exercise_submission.json"

echo "All test payloads sent."
