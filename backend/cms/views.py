import json
import re

from django.core.cache import cache
from django.db.models import Prefetch
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import (
    ABTextExperiment,
    CalculatorOption,
    CalculatorQuestion,
    CaseItem,
    FaqItem,
    LeadRequest,
    StatisticSection,
)
from .telegram import send_lead_to_telegram

PHONE_PATTERN = re.compile(r"^\+7\d{10}$")


def _normalize_phone(value):
    digits = re.sub(r"\D", "", value or "")
    if not digits:
        return ""
    if digits[0] == "8":
        digits = f"7{digits[1:]}"
    if digits[0] != "7":
        digits = f"7{digits}"
    digits = digits[:11]
    if len(digits) != 11:
        return ""
    return f"+{digits}"


def _client_ip(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def _resolve_snippets():
    experiments = ABTextExperiment.objects.filter(is_active=True).order_by(
        "sort_order", "id"
    )
    snippets = {}

    for experiment in experiments:
        snippets[experiment.key] = experiment.default_text

    return snippets


def _deliver_lead_to_telegram(lead):
    is_sent, error_text = send_lead_to_telegram(lead)

    lead.telegram_attempts += 1
    if is_sent:
        lead.telegram_status = LeadRequest.TELEGRAM_SENT
        lead.telegram_sent_at = timezone.now()
        lead.telegram_last_error = ""
    else:
        lead.telegram_status = LeadRequest.TELEGRAM_FAILED
        lead.telegram_last_error = (error_text or "Unknown Telegram error")[:2000]

    lead.save(
        update_fields=(
            "telegram_status",
            "telegram_sent_at",
            "telegram_attempts",
            "telegram_last_error",
            "updated_at",
        )
    )


def _stats_payload():
    section = (
        StatisticSection.objects.filter(is_active=True)
        .prefetch_related("items", "links")
        .order_by("id")
        .first()
    )

    if not section:
        return {
            "title": "",
            "know_title": "",
            "items": [],
            "links": [],
        }

    items = [
        {
            "value": item.value,
            "description": item.description,
        }
        for item in section.items.filter(is_active=True).order_by("sort_order", "id")
    ]

    links = [
        {
            "title": link.title,
            "url": link.url,
        }
        for link in section.links.filter(is_active=True).order_by("sort_order", "id")
    ]

    return {
        "title": section.title,
        "know_title": section.know_title,
        "items": items,
        "links": links,
    }


def _calculator_payload():
    questions = (
        CalculatorQuestion.objects.filter(is_active=True)
        .prefetch_related(
            Prefetch(
                "options",
                queryset=CalculatorOption.objects.filter(is_active=True).order_by(
                    "sort_order", "id"
                ),
            )
        )
        .order_by("sort_order", "id")
    )

    return [
        {
            "id": question.key,
            "selection": question.selection,
            "is_required": question.is_required,
            "title": question.title,
            "text": question.text,
            "options": [
                {
                    "id": option.key,
                    "title": option.title,
                    "description": option.description,
                    "price": option.price,
                }
                for option in question.options.all()
            ],
        }
        for question in questions
    ]


@require_GET
def public_content(request):
    faq_items = FaqItem.objects.filter(is_active=True).order_by("sort_order", "id")
    case_items = CaseItem.objects.filter(is_active=True).order_by("sort_order", "id")
    snippets = _resolve_snippets()
    stats = _stats_payload()
    calculator = _calculator_payload()

    return JsonResponse(
        {
            "snippets": snippets,
            "stats": stats,
            "calculator": calculator,
            "faq": [
                {
                    "question": faq.question,
                    "answer": faq.answer,
                }
                for faq in faq_items
            ],
            "cases": [
                {
                    "project": case.project,
                    "result": case.result,
                    "review": case.review,
                    "author": case.author,
                    "role": case.role,
                    "image": request.build_absolute_uri(case.image.url) if case.image else "",
                }
                for case in case_items
            ],
        }
    )


@csrf_exempt
@require_POST
def create_lead(request):
    ip_address = _client_ip(request) or "unknown"
    rate_limit_key = f"lead-rate:{ip_address}"
    attempts = cache.get(rate_limit_key, 0)

    if attempts >= 8:
        return JsonResponse(
            {"ok": False, "error": "Слишком много запросов. Повторите позже."},
            status=429,
        )

    cache.set(rate_limit_key, attempts + 1, timeout=60 * 10)

    try:
        body = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse({"ok": False, "error": "Некорректные данные."}, status=400)

    name = (body.get("name") or "").strip()
    phone = _normalize_phone(body.get("phone", ""))
    source = (body.get("source") or LeadRequest.SOURCE_FORM).strip()
    message = (body.get("message") or "").strip()
    payload = body.get("payload") or {}

    if len(name) < 2:
        return JsonResponse({"ok": False, "error": "Имя должно быть от 2 символов."}, status=400)

    if not PHONE_PATTERN.match(phone):
        return JsonResponse(
            {"ok": False, "error": "Телефон должен быть в формате +7XXXXXXXXXX."},
            status=400,
        )

    valid_sources = {choice[0] for choice in LeadRequest.SOURCE_OPTIONS}
    if source not in valid_sources:
        source = LeadRequest.SOURCE_FORM

    if not isinstance(payload, dict):
        payload = {}

    lead = LeadRequest.objects.create(
        name=name[:120],
        phone=phone,
        source=source,
        message=message[:5000],
        payload=payload,
        ip_address=_client_ip(request),
        user_agent=(request.META.get("HTTP_USER_AGENT") or "")[:255],
    )

    _deliver_lead_to_telegram(lead)

    return JsonResponse(
        {"ok": True, "id": lead.id, "telegram_status": lead.telegram_status}
    )
