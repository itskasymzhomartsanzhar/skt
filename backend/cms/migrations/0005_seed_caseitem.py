from django.db import migrations


def seed_case_items(apps, schema_editor):
    CaseItem = apps.get_model("cms", "CaseItem")

    if CaseItem.objects.exists():
        return

    case_rows = [
        {
            "project": "Интернет-магазин мебели",
            "result": "+41% к заявкам за 2 месяца после запуска",
            "review": "Команда собрала нам понятную воронку: новый сайт, квизы и заявки в CRM. Мы начали получать больше качественных обращений уже в первый месяц.",
            "author": "Александр",
            "role": "Собственник бизнеса",
            "image_url": "https://picsum.photos/seed/skt-case-1/1400/900",
            "sort_order": 1,
            "is_active": True,
        },
        {
            "project": "Юридическая компания",
            "result": "x2.3 рост конверсии посадочной страницы",
            "review": "Мы наконец получили сайт, который продает. Клиенты приходят с пониманием услуг, а менеджеры перестали тратить время на нецелевые звонки.",
            "author": "Мария",
            "role": "Операционный директор",
            "image_url": "https://picsum.photos/seed/skt-case-2/1400/900",
            "sort_order": 2,
            "is_active": True,
        },
        {
            "project": "Клиника эстетической медицины",
            "result": "-28% стоимость лида из рекламы",
            "review": "После редизайна и настройки рекламы лиды стали ощутимо дешевле. Появилась прозрачная аналитика по каналам и реальной окупаемости.",
            "author": "Елена",
            "role": "Маркетолог проекта",
            "image_url": "https://picsum.photos/seed/skt-case-3/1400/900",
            "sort_order": 3,
            "is_active": True,
        },
    ]

    for row in case_rows:
        CaseItem.objects.create(**row)


def unseed_case_items(apps, schema_editor):
    CaseItem = apps.get_model("cms", "CaseItem")
    CaseItem.objects.filter(project__in=[
        "Интернет-магазин мебели",
        "Юридическая компания",
        "Клиника эстетической медицины",
    ]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("cms", "0004_caseitem_alter_abtextexperiment_options_and_more"),
    ]

    operations = [
        migrations.RunPython(seed_case_items, unseed_case_items),
    ]
