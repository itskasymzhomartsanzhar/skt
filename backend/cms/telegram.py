import json
import time
from html import escape

import requests
from django.conf import settings
from django.utils import timezone

MAX_MESSAGE_LENGTH = 3900


def is_telegram_configured():
    return bool(settings.TELEGRAM_BOT_TOKEN and settings.TELEGRAM_CHAT_ID)


def _format_payload(payload):
    if not payload:
        return "-"

    try:
        result = json.dumps(payload, ensure_ascii=False, indent=2)
    except (TypeError, ValueError):
        result = str(payload)

    if len(result) > 1200:
        return f"{result[:1197]}..."
    return result


def build_lead_message(lead):
    created_at = timezone.localtime(lead.created_at) if lead.created_at else timezone.localtime()
    message = (
        "<b>Новая заявка с сайта</b>\n"
        f"<b>ID:</b> {lead.id}\n"
        f"<b>Дата:</b> {created_at.strftime('%d.%m.%Y %H:%M:%S')}\n"
        f"<b>Имя:</b> {escape(lead.name)}\n"
        f"<b>Телефон:</b> {escape(lead.phone)}\n"
        f"<b>Источник:</b> {escape(lead.source)}\n"

    )

    if len(message) > MAX_MESSAGE_LENGTH:
        message = f"{message[:MAX_MESSAGE_LENGTH - 1]}..."

    return message


def send_message(text):
    if not is_telegram_configured():
        return False, "Telegram credentials are not configured."

    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": settings.TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    last_error = "Unknown Telegram error"

    for attempt in range(1, settings.TELEGRAM_MAX_RETRIES + 1):
        try:
            response = requests.post(
                url,
                json=payload,
                timeout=(3.05, settings.TELEGRAM_REQUEST_TIMEOUT),
            )
        except requests.RequestException as exc:
            last_error = str(exc)
        else:
            response_data = {}
            try:
                response_data = response.json()
            except ValueError:
                pass

            if response.ok and response_data.get("ok") is True:
                return True, ""

            description = response_data.get("description") if isinstance(response_data, dict) else ""
            if description:
                last_error = description
            else:
                snippet = response.text[:300]
                last_error = f"Telegram API HTTP {response.status_code}: {snippet}"

        if attempt < settings.TELEGRAM_MAX_RETRIES:
            time.sleep(min(0.7 * attempt, 2.0))

    return False, last_error


def send_lead_to_telegram(lead):
    return send_message(build_lead_message(lead))
