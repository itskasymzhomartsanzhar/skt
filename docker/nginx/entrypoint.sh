#!/bin/sh
set -eu

DOMAIN="sktagency.pro"
LE_BASE="/etc/letsencrypt/live"
TARGET_DIR="/etc/nginx/ssl"
FULLCHAIN="$TARGET_DIR/fullchain.pem"
PRIVKEY="$TARGET_DIR/privkey.pem"

mkdir -p "$TARGET_DIR"

SOURCE_DIR=""
if [ -f "$LE_BASE/$DOMAIN/fullchain.pem" ] && [ -f "$LE_BASE/$DOMAIN/privkey.pem" ]; then
  SOURCE_DIR="$LE_BASE/$DOMAIN"
else
  LATEST_DIR="$(ls -1d "$LE_BASE/${DOMAIN}-"* 2>/dev/null | sort -V | tail -n 1 || true)"
  if [ -n "$LATEST_DIR" ] && [ -f "$LATEST_DIR/fullchain.pem" ] && [ -f "$LATEST_DIR/privkey.pem" ]; then
    SOURCE_DIR="$LATEST_DIR"
  fi
fi

if [ -n "$SOURCE_DIR" ]; then
  cp "$SOURCE_DIR/fullchain.pem" "$FULLCHAIN"
  cp "$SOURCE_DIR/privkey.pem" "$PRIVKEY"
else
  openssl req -x509 -nodes -newkey rsa:2048 -days 14 \
    -subj "/C=KZ/ST=Almaty/L=Almaty/O=SKT Agency/CN=sktagency.pro" \
    -keyout "$PRIVKEY" \
    -out "$FULLCHAIN"
fi

exec nginx -g 'daemon off;'
