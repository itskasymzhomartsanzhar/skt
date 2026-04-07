from django.contrib import admin, messages
from django.utils import timezone

from .models import (
    ABTextExperiment,
    CalculatorOption,
    CalculatorQuestion,
    CaseItem,
    FaqItem,
    LeadRequest,
    StatisticItem,
    StatisticLink,
    StatisticSection,
)
from .telegram import send_lead_to_telegram


@admin.register(FaqItem)
class FaqItemAdmin(admin.ModelAdmin):
    list_display = ("question", "sort_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("question", "answer")
    list_editable = ("sort_order", "is_active")


class StatisticItemInline(admin.TabularInline):
    model = StatisticItem
    extra = 1
    fields = ("value", "description", "sort_order", "is_active")
    ordering = ("sort_order", "id")


class StatisticLinkInline(admin.TabularInline):
    model = StatisticLink
    extra = 1
    fields = ("title", "url", "sort_order", "is_active")
    ordering = ("sort_order", "id")


@admin.register(StatisticSection)
class StatisticSectionAdmin(admin.ModelAdmin):
    list_display = ("title", "key", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("title", "know_title", "key")
    inlines = (StatisticItemInline, StatisticLinkInline)


@admin.register(ABTextExperiment)
class ABTextExperimentAdmin(admin.ModelAdmin):
    list_display = ("label", "key", "is_active", "sort_order", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("label", "key", "default_text", "description")
    list_editable = ("is_active", "sort_order")
    fieldsets = (
        (
            "Основные параметры",
            {
                "fields": ("label", "key", "is_active", "sort_order"),
            },
        ),
        (
            "Тексты",
            {
                "fields": ("default_text", "description"),
            },
        ),
    )


class CalculatorOptionInline(admin.TabularInline):
    model = CalculatorOption
    extra = 1
    fields = ("key", "title", "description", "price", "sort_order", "is_active")
    ordering = ("sort_order", "id")


@admin.register(CalculatorQuestion)
class CalculatorQuestionAdmin(admin.ModelAdmin):
    list_display = ("title", "key", "selection", "is_required", "sort_order", "is_active")
    list_filter = ("selection", "is_required", "is_active")
    search_fields = ("title", "key", "text")
    list_editable = ("is_required", "sort_order", "is_active")
    inlines = (CalculatorOptionInline,)


@admin.register(LeadRequest)
class LeadRequestAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "name",
        "phone",
        "source",
        "telegram_status",
        "telegram_attempts",
        "is_processed",
    )
    list_filter = ("source", "telegram_status", "is_processed", "created_at")
    search_fields = ("name", "phone", "message")
    actions = ("mark_as_processed", "mark_as_unprocessed", "retry_telegram_delivery")
    readonly_fields = (
        "name",
        "phone",
        "source",
        "message",
        "payload",
        "ip_address",
        "user_agent",
        "telegram_status",
        "telegram_attempts",
        "telegram_sent_at",
        "telegram_last_error",
        "created_at",
        "updated_at",
    )
    fieldsets = (
        (
            "Контакты",
            {
                "fields": ("name", "phone", "source", "message", "is_processed"),
            },
        ),
        (
            "Технические данные",
            {
                "fields": ("payload", "ip_address", "user_agent", "created_at", "updated_at"),
            },
        ),
        (
            "Telegram",
            {
                "fields": (
                    "telegram_status",
                    "telegram_attempts",
                    "telegram_sent_at",
                    "telegram_last_error",
                ),
            },
        ),
    )

    @admin.action(description="Отметить как обработанные")
    def mark_as_processed(self, request, queryset):
        queryset.update(is_processed=True)

    @admin.action(description="Снять отметку обработки")
    def mark_as_unprocessed(self, request, queryset):
        queryset.update(is_processed=False)

    @admin.action(description="Повторно отправить в Telegram")
    def retry_telegram_delivery(self, request, queryset):
        sent_count = 0
        failed_count = 0

        for lead in queryset:
            is_sent, error_text = send_lead_to_telegram(lead)
            lead.telegram_attempts += 1

            if is_sent:
                lead.telegram_status = LeadRequest.TELEGRAM_SENT
                lead.telegram_sent_at = timezone.now()
                lead.telegram_last_error = ""
                sent_count += 1
            else:
                lead.telegram_status = LeadRequest.TELEGRAM_FAILED
                lead.telegram_last_error = (error_text or "Unknown Telegram error")[:2000]
                failed_count += 1

            lead.save(
                update_fields=(
                    "telegram_status",
                    "telegram_attempts",
                    "telegram_sent_at",
                    "telegram_last_error",
                    "updated_at",
                )
            )

        if sent_count:
            self.message_user(request, f"Отправлено в Telegram: {sent_count}")
        if failed_count:
            self.message_user(request, f"С ошибкой: {failed_count}", level=messages.ERROR)


@admin.register(CaseItem)
class CaseItemAdmin(admin.ModelAdmin):
    list_display = ("project", "author", "sort_order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("project", "result", "review", "author", "role")
    list_editable = ("sort_order", "is_active")
    fields = ("project", "result", "review", "author", "role", "image", "sort_order", "is_active")


admin.site.site_header = "SKT Agency CMS"
admin.site.site_title = "SKT Agency CMS"
admin.site.index_title = "Контент и заявки"
