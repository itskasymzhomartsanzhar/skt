# HTTPS для `sktagency.pro`

## Перед запуском

- A-запись `sktagency.pro` должна указывать на IP сервера.
- A-запись `www.sktagency.pro` должна указывать на тот же IP.
- Порты `80` и `443` должны быть открыты.

## 1) Поднять проект

```bash
docker compose up -d --build backend nginx
```

## 2) Выпустить SSL сертификат Let's Encrypt и перезапустить nginx

```bash
docker compose run --rm certbot && docker compose restart nginx
```

## Готово

- Сайт: `https://sktagency.pro`
- Админка: `https://sktagency.pro/admin/`

## Опционально: создать админа

```bash
docker compose exec backend python manage.py createsuperuser
```
