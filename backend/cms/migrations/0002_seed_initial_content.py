from django.db import migrations


def seed_initial_content(apps, schema_editor):
    FaqItem = apps.get_model("cms", "FaqItem")
    StatisticSection = apps.get_model("cms", "StatisticSection")
    StatisticItem = apps.get_model("cms", "StatisticItem")
    StatisticLink = apps.get_model("cms", "StatisticLink")
    ABTextExperiment = apps.get_model("cms", "ABTextExperiment")
    ABTextVariant = apps.get_model("cms", "ABTextVariant")

    section = StatisticSection.objects.create(
        key="main",
        title="CТАТИСТИКА НАШЕЙ СИСТЕМЫ",
        know_title="ТАКЖЕ МОЖЕТЕ ЗНАТЬ НАС",
        is_active=True,
    )

    stats_items = [
        ("16.5", "Дней в среднем на реализацию проекта"),
        ("80%", "Общения с клиентами берёт на себя AI менеджер"),
        ("100%", "Заявок зафиксировано в системе"),
        ("0", "Потерянных клиентов за всё время"),
    ]
    for index, (value, description) in enumerate(stats_items, start=1):
        StatisticItem.objects.create(
            section=section,
            value=value,
            description=description,
            sort_order=index,
            is_active=True,
        )

    stats_links = [
        ("SKT Careers", "https://sktagency.pro/careers"),
        ("SKT Design", "https://sktagency.pro/design"),
        ("SKT Products", "https://sktagency.pro/products"),
        ("SwiftStore", "https://swiftstore.kz"),
    ]
    for index, (title, url) in enumerate(stats_links, start=1):
        StatisticLink.objects.create(
            section=section,
            title=title,
            url=url,
            sort_order=index,
            is_active=True,
        )

    faq_data = [
        (
            "Сколько времени занимает запуск проекта?",
            "Обычно первый релиз запускаем за 2-6 недель в зависимости от объема. На старте даем четкий план этапов и сроков.",
        ),
        (
            "Вы берете на себя дизайн и разработку вместе?",
            "Да, мы закрываем полный цикл: аналитика, структура, дизайн, разработка, подключение интеграций и финальный запуск.",
        ),
        (
            "Можно ли доработать текущий сайт, а не делать новый?",
            "Можно. Сначала делаем аудит, определяем узкие места и собираем план улучшений с приоритетами по влиянию на продажи.",
        ),
        (
            "Как вы помогаете после запуска?",
            "Подключаем аналитику, отслеживаем ключевые метрики, предлагаем улучшения и поддерживаем проект по согласованному формату.",
        ),
        (
            "Работаете ли вы с рекламой и SEO после разработки?",
            "Да, можем вести проект дальше: контекстная реклама, SEO-работы, оптимизация конверсии и автоматизация обработки заявок.",
        ),
    ]
    for index, (question, answer) in enumerate(faq_data, start=1):
        FaqItem.objects.create(
            question=question,
            answer=answer,
            sort_order=index,
            is_active=True,
        )

    hero_title_experiment = ABTextExperiment.objects.create(
        key="hero_title",
        label="Hero: главный заголовок",
        default_text="Не теряйте клиентов — управляйте ими",
        description="Ключевой заголовок первого экрана.",
        is_active=True,
        sort_order=1,
    )
    ABTextVariant.objects.create(
        experiment=hero_title_experiment,
        code="A",
        text="Не теряйте клиентов — управляйте ими",
        weight=1,
        is_active=True,
    )
    ABTextVariant.objects.create(
        experiment=hero_title_experiment,
        code="B",
        text="Система, где каждая заявка превращается в клиента",
        weight=1,
        is_active=True,
    )

    hero_description_experiment = ABTextExperiment.objects.create(
        key="hero_description",
        label="Hero: описание",
        default_text="Создаём систему, где каждая заявка фиксируется, обрабатывается и приносит деньги. Сайт + CRM + автоматизация — всё, чтобы заявки превращались в клиентов.",
        description="Описание первого экрана.",
        is_active=True,
        sort_order=2,
    )
    ABTextVariant.objects.create(
        experiment=hero_description_experiment,
        code="A",
        text="Создаём систему, где каждая заявка фиксируется, обрабатывается и приносит деньги. Сайт + CRM + автоматизация — всё, чтобы заявки превращались в клиентов.",
        weight=1,
        is_active=True,
    )
    ABTextVariant.objects.create(
        experiment=hero_description_experiment,
        code="B",
        text="Объединяем сайт, CRM и автоматизацию в единую воронку, чтобы вы видели заявки, продажи и рост в цифрах.",
        weight=1,
        is_active=True,
    )

    ABTextExperiment.objects.create(
        key="lead_form_title",
        label="Lead form: заголовок",
        default_text="Заполните форму и получите AI-менеджера в подарок к проекту",
        description="Заголовок блока заявки.",
        is_active=True,
        sort_order=3,
    )


def unseed_initial_content(apps, schema_editor):
    FaqItem = apps.get_model("cms", "FaqItem")
    StatisticSection = apps.get_model("cms", "StatisticSection")
    ABTextExperiment = apps.get_model("cms", "ABTextExperiment")

    FaqItem.objects.all().delete()
    StatisticSection.objects.all().delete()
    ABTextExperiment.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_initial_content, unseed_initial_content),
    ]
