from django.core.validators import MinValueValidator, RegexValidator
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class FaqItem(TimeStampedModel):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"

    def __str__(self):
        return self.question


class StatisticSection(TimeStampedModel):
    key = models.CharField(
        max_length=64,
        unique=True,
        validators=[RegexValidator(r"^[a-z0-9_\-]+$")],
        default="main",
    )
    title = models.CharField(max_length=180)
    know_title = models.CharField(max_length=180)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("id",)
        verbose_name = "Секция статистики"
        verbose_name_plural = "Секции статистики"

    def __str__(self):
        return self.title


class StatisticItem(TimeStampedModel):
    section = models.ForeignKey(
        StatisticSection, on_delete=models.CASCADE, related_name="items"
    )
    value = models.CharField(max_length=40)
    description = models.CharField(max_length=280)
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "Пункт статистики"
        verbose_name_plural = "Пункты статистики"

    def __str__(self):
        return f"{self.value}: {self.description}"


class StatisticLink(TimeStampedModel):
    section = models.ForeignKey(
        StatisticSection, on_delete=models.CASCADE, related_name="links"
    )
    title = models.CharField(max_length=120)
    url = models.CharField(max_length=500, default="/")
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "Ссылка секции статистики"
        verbose_name_plural = "Ссылки секции статистики"

    def __str__(self):
        return self.title


class ABTextExperiment(TimeStampedModel):
    key = models.CharField(
        max_length=80,
        unique=True,
        validators=[RegexValidator(r"^[a-z0-9_\-\.]+$")],
    )
    label = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    default_text = models.TextField()
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=100)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "Текстовый сниппет"
        verbose_name_plural = "Текстовые сниппеты"

    def __str__(self):
        return self.label


class ABTextVariant(TimeStampedModel):
    experiment = models.ForeignKey(
        ABTextExperiment, on_delete=models.CASCADE, related_name="variants"
    )
    code = models.CharField(
        max_length=20,
        validators=[RegexValidator(r"^[A-Za-z0-9_\-]+$")],
    )
    text = models.TextField()
    weight = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1)]
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("id",)
        unique_together = ("experiment", "code")
        verbose_name = "Вариант текста (резерв)"
        verbose_name_plural = "Варианты текста (резерв)"

    def __str__(self):
        return f"{self.experiment.key}:{self.code}"


class CalculatorQuestion(TimeStampedModel):
    SELECTION_SINGLE = "single"
    SELECTION_MULTIPLE = "multiple"
    SELECTION_OPTIONS = (
        (SELECTION_SINGLE, "Один ответ"),
        (SELECTION_MULTIPLE, "Несколько ответов"),
    )

    key = models.CharField(
        max_length=80,
        unique=True,
        validators=[RegexValidator(r"^[A-Za-z0-9_\-\.]+$")],
    )
    title = models.CharField(max_length=220)
    text = models.TextField(blank=True)
    selection = models.CharField(
        max_length=10,
        choices=SELECTION_OPTIONS,
        default=SELECTION_SINGLE,
    )
    is_required = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "Вопрос калькулятора"
        verbose_name_plural = "Вопросы калькулятора"

    def __str__(self):
        return self.title


class CalculatorOption(TimeStampedModel):
    question = models.ForeignKey(
        CalculatorQuestion, on_delete=models.CASCADE, related_name="options"
    )
    key = models.CharField(
        max_length=80,
        validators=[RegexValidator(r"^[A-Za-z0-9_\-\.]+$")],
    )
    title = models.CharField(max_length=220)
    description = models.CharField(max_length=320, blank=True)
    price = models.PositiveIntegerField(default=0)
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        unique_together = ("question", "key")
        verbose_name = "Вариант ответа калькулятора"
        verbose_name_plural = "Варианты ответов калькулятора"

    def __str__(self):
        return f"{self.question.key}:{self.title}"


class LeadRequest(TimeStampedModel):
    SOURCE_FORM = "lead_form"
    SOURCE_CALCULATOR = "calculator"
    SOURCE_HERO = "hero_cta"
    TELEGRAM_PENDING = "pending"
    TELEGRAM_SENT = "sent"
    TELEGRAM_FAILED = "failed"
    SOURCE_OPTIONS = (
        (SOURCE_FORM, "Lead form"),
        (SOURCE_CALCULATOR, "Calculator"),
        (SOURCE_HERO, "Hero CTA"),
    )
    TELEGRAM_STATUS_OPTIONS = (
        (TELEGRAM_PENDING, "Ожидает отправки"),
        (TELEGRAM_SENT, "Отправлено"),
        (TELEGRAM_FAILED, "Ошибка отправки"),
    )

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=24)
    source = models.CharField(max_length=24, choices=SOURCE_OPTIONS)
    message = models.TextField(blank=True)
    payload = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    is_processed = models.BooleanField(default=False)
    telegram_status = models.CharField(
        max_length=12,
        choices=TELEGRAM_STATUS_OPTIONS,
        default=TELEGRAM_PENDING,
        db_index=True,
    )
    telegram_attempts = models.PositiveSmallIntegerField(default=0)
    telegram_sent_at = models.DateTimeField(null=True, blank=True)
    telegram_last_error = models.TextField(blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return f"{self.name} · {self.phone}"


class CaseItem(TimeStampedModel):
    project = models.CharField(max_length=220)
    result = models.CharField(max_length=260)
    review = models.TextField()
    author = models.CharField(max_length=120)
    role = models.CharField(max_length=160)
    image = models.ImageField(upload_to="cases/", blank=True, null=True)
    sort_order = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "id")
        verbose_name = "Кейс"
        verbose_name_plural = "Кейсы"

    def __str__(self):
        return self.project
