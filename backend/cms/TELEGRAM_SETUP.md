# Telegram Delivery For Leads

## Environment variables

- `DJANGO_TELEGRAM_BOT_TOKEN`
- `DJANGO_TELEGRAM_CHAT_ID`
- `DJANGO_TELEGRAM_TIMEOUT` (default: `8`)
- `DJANGO_TELEGRAM_MAX_RETRIES` (default: `3`)

## Manual retry

```bash
python3 manage.py retry_telegram_leads --limit 100 --cooldown-minutes 1
```

## Recommended cron (every minute)

```bash
* * * * * cd /path/to/backend && /usr/bin/python3 manage.py retry_telegram_leads --limit 100 --cooldown-minutes 1 >> /var/log/skt-telegram-retry.log 2>&1
```
