from django.db import migrations


def seed_calculator_questions(apps, schema_editor):
    CalculatorQuestion = apps.get_model("cms", "CalculatorQuestion")
    CalculatorOption = apps.get_model("cms", "CalculatorOption")

    if CalculatorQuestion.objects.exists():
        return

    questions = [
        {
            "key": "projectType",
            "title": "Какой проект вам нужен?",
            "text": "Выберите формат продукта, который нужно запустить первым этапом.",
            "selection": "single",
            "is_required": True,
            "sort_order": 1,
            "is_active": True,
            "options": [
                {
                    "key": "landing",
                    "title": "Лендинг",
                    "description": "До 8 блоков, фокус на конверсию",
                    "price": 350000,
                    "sort_order": 1,
                },
                {
                    "key": "corporate",
                    "title": "Корпоративный сайт",
                    "description": "До 8 страниц + структура услуг",
                    "price": 650000,
                    "sort_order": 2,
                },
                {
                    "key": "service",
                    "title": "Сайт-сервис",
                    "description": "Интеграции, форма, оплата, записи",
                    "price": 920000,
                    "sort_order": 3,
                },
                {
                    "key": "shop",
                    "title": "Интернет-магазин",
                    "description": "Каталог, корзина, оплата, фильтры",
                    "price": 920000,
                    "sort_order": 4,
                },
            ],
        },
        {
            "key": "designReady",
            "title": "Есть ли готовый дизайн?",
            "text": "Это поможет понять, делать ли полный дизайн с нуля или сразу идти в разработку.",
            "selection": "single",
            "is_required": True,
            "sort_order": 2,
            "is_active": True,
            "options": [
                {
                    "key": "yes",
                    "title": "Да",
                    "description": "Макеты готовы, можно стартовать быстрее",
                    "price": 0,
                    "sort_order": 1,
                },
                {
                    "key": "no",
                    "title": "Нет",
                    "description": "Нужен полный цикл дизайна под проект",
                    "price": 180000,
                    "sort_order": 2,
                },
                {
                    "key": "reference",
                    "title": "Есть референс",
                    "description": "Соберем дизайн на основе ваших примеров",
                    "price": 90000,
                    "sort_order": 3,
                },
            ],
        },
        {
            "key": "traffic",
            "title": "Нужен ли запуск рекламы?",
            "text": "Выберите объем маркетинга сразу после запуска сайта.",
            "selection": "single",
            "is_required": True,
            "sort_order": 3,
            "is_active": True,
            "options": [
                {
                    "key": "none",
                    "title": "Пока без рекламы",
                    "description": "Только запуск сайта",
                    "price": 0,
                    "sort_order": 1,
                },
                {
                    "key": "start",
                    "title": "Базовый запуск",
                    "description": "Google / Яндекс + базовая аналитика",
                    "price": 220000,
                    "sort_order": 2,
                },
                {
                    "key": "growth",
                    "title": "Активный рост",
                    "description": "Google / Яндекс / Meta + оптимизация",
                    "price": 420000,
                    "sort_order": 3,
                },
            ],
        },
        {
            "key": "integrations",
            "title": "Какие ещё дополнительные интеграции нужны?",
            "text": "Можно выбрать сразу несколько пунктов.",
            "selection": "multiple",
            "is_required": False,
            "sort_order": 4,
            "is_active": True,
            "options": [
                {
                    "key": "aiManager",
                    "title": "AI менеджер",
                    "description": "Автоматическая квалификация и ответы по скриптам",
                    "price": 340000,
                    "sort_order": 1,
                },
                {
                    "key": "salesAnalytics",
                    "title": "Постоянная аналитика и статистика продаж",
                    "description": "Дашборды по каналам, лидам и конверсии",
                    "price": 170000,
                    "sort_order": 2,
                },
                {
                    "key": "advancedCrm",
                    "title": "Более расширенный CRM",
                    "description": "Автоматизация статусов, воронка и контроль менеджеров",
                    "price": 220000,
                    "sort_order": 3,
                },
                {
                    "key": "marketingUpgrade",
                    "title": "Улучшение маркетинговой составляющей",
                    "description": "Усиление рекламы, креативов и ретаргетинга",
                    "price": 260000,
                    "sort_order": 4,
                },
            ],
        },
        {
            "key": "budget",
            "title": "Какой планируемый бюджет проекта?",
            "text": "Подберем оптимальный состав работ под ваши возможности и цели.",
            "selection": "single",
            "is_required": True,
            "sort_order": 5,
            "is_active": True,
            "options": [
                {
                    "key": "basic",
                    "title": "До 800 000 ₸",
                    "description": "Стартовая комплектация с приоритетом на запуск",
                    "price": 0,
                    "sort_order": 1,
                },
                {
                    "key": "optimal",
                    "title": "800 000 — 1 500 000 ₸",
                    "description": "Оптимальный баланс функционала и роста",
                    "price": 180000,
                    "sort_order": 2,
                },
                {
                    "key": "advanced",
                    "title": "От 1 500 000 ₸",
                    "description": "Расширенный запуск с максимальным потенциалом",
                    "price": 350000,
                    "sort_order": 3,
                },
            ],
        },
    ]

    for question_data in questions:
        options = question_data.pop("options")
        question = CalculatorQuestion.objects.create(**question_data)

        for option_data in options:
            CalculatorOption.objects.create(
                question=question,
                is_active=True,
                **option_data,
            )


def unseed_calculator_questions(apps, schema_editor):
    CalculatorQuestion = apps.get_model("cms", "CalculatorQuestion")
    CalculatorQuestion.objects.filter(
        key__in=["projectType", "designReady", "traffic", "integrations", "budget"]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("cms", "0008_calculatorquestion_calculatoroption"),
    ]

    operations = [
        migrations.RunPython(seed_calculator_questions, unseed_calculator_questions),
    ]
