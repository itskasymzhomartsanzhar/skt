#!/bin/sh
set -eu

CERT_DIR="/etc/letsencrypt/live/sktagency.pro"
FULLCHAIN="$CERT_DIR/fullchain.pem"
PRIVKEY="$CERT_DIR/privkey.pem"

if [ ! -f "$FULLCHAIN" ] || [ ! -f "$PRIVKEY" ]; then
  mkdir -p "$CERT_DIR"
  openssl req -x509 -nodes -newkey rsa:2048 -days 14 \
    -subj "/C=KZ/ST=Almaty/L=Almaty/O=SKT Agency/CN=sktagency.pro" \
    -keyout "$PRIVKEY" \
    -out "$FULLCHAIN"
fi

exec nginx -g 'daemon off;'
