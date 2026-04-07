from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from cms.models import LeadRequest
from cms.telegram import send_lead_to_telegram


class Command(BaseCommand):
    help = "Повторная отправка неотправленных заявок в Telegram"

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=50)
        parser.add_argument("--cooldown-minutes", type=int, default=2)
        parser.add_argument("--max-attempts", type=int, default=20)

    def handle(self, *args, **options):
        limit = max(options["limit"], 1)
        cooldown_minutes = max(options["cooldown_minutes"], 0)
        max_attempts = max(options["max_attempts"], 1)

        threshold = timezone.now() - timedelta(minutes=cooldown_minutes)

        leads = (
            LeadRequest.objects.filter(
                telegram_status__in=(LeadRequest.TELEGRAM_PENDING, LeadRequest.TELEGRAM_FAILED),
                telegram_attempts__lt=max_attempts,
                updated_at__lte=threshold,
            )
            .order_by("created_at")[:limit]
        )

        processed = 0
        sent = 0
        failed = 0

        for lead in leads:
            processed += 1
            is_sent, error_text = send_lead_to_telegram(lead)
            lead.telegram_attempts += 1

            if is_sent:
                lead.telegram_status = LeadRequest.TELEGRAM_SENT
                lead.telegram_sent_at = timezone.now()
                lead.telegram_last_error = ""
                sent += 1
            else:
                lead.telegram_status = LeadRequest.TELEGRAM_FAILED
                lead.telegram_last_error = (error_text or "Unknown Telegram error")[:2000]
                failed += 1

            lead.save(
                update_fields=(
                    "telegram_status",
                    "telegram_sent_at",
                    "telegram_attempts",
                    "telegram_last_error",
                    "updated_at",
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Processed={processed}, Sent={sent}, Failed={failed}, Limit={limit}"
            )
        )
