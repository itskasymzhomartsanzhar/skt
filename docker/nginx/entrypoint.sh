#!/bin/sh
set -eu

DOMAIN="${DOMAIN:-sktagency.pro}"
LE_BASE="/etc/letsencrypt/live"
TARGET_DIR="/etc/nginx/ssl"
FULLCHAIN="$TARGET_DIR/fullchain.pem"
PRIVKEY="$TARGET_DIR/privkey.pem"
REQUIRE_LE_CERT="${REQUIRE_LE_CERT:-0}"

mkdir -p "$TARGET_DIR"

log() {
  printf '%s\n' "$*"
}

has_valid_pair() {
  local dir="$1"
  [ -f "$dir/fullchain.pem" ] && [ -f "$dir/privkey.pem" ]
}

SOURCE_DIR=""
PRIMARY_DIR="$LE_BASE/$DOMAIN"

if has_valid_pair "$PRIMARY_DIR"; then
  SOURCE_DIR="$PRIMARY_DIR"
else
  LATEST_DIR="$(find "$LE_BASE" -mindepth 1 -maxdepth 1 -type d -name "${DOMAIN}-*" | sort -V | tail -n 1 || true)"
  if [ -n "$LATEST_DIR" ] && has_valid_pair "$LATEST_DIR"; then
    SOURCE_DIR="$LATEST_DIR"
    if [ ! -e "$PRIMARY_DIR" ]; then
      ln -s "$LATEST_DIR" "$PRIMARY_DIR"
      log "Created symlink $PRIMARY_DIR -> $LATEST_DIR"
    fi
  fi
fi

if [ -n "$SOURCE_DIR" ]; then
  cp -f "$SOURCE_DIR/fullchain.pem" "$FULLCHAIN"
  cp -f "$SOURCE_DIR/privkey.pem" "$PRIVKEY"
  chmod 600 "$PRIVKEY"
  log "Loaded Let's Encrypt certificate from $SOURCE_DIR"
else
  if [ "$REQUIRE_LE_CERT" = "1" ]; then
    log "ERROR: Let's Encrypt certificate not found for $DOMAIN"
    exit 1
  fi
  log "WARNING: Let's Encrypt certificate not found, generating temporary self-signed cert"
  openssl req -x509 -nodes -newkey rsa:2048 -days 14 \
    -subj "/C=KZ/ST=Almaty/L=Almaty/O=SKT Agency/CN=$DOMAIN" \
    -keyout "$PRIVKEY" \
    -out "$FULLCHAIN"
fi

exec nginx -g 'daemon off;'
