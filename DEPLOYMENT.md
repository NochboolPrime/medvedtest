# Инструкция по развертыванию на хостинге

## Переменные окружения

Для работы сайта необходимо создать файл `.env.local` в корне проекта с двумя ключами:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://boupulabkeedum.beget.app
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY2NzA3MjAwLCJleHAiOjE5MjQ0NzM2MDB9.H45A51jxdBcwiuJjllfR8liD8VEiVrqmikCOUA8Dr9o
```

## Установка и запуск

1. Скопируйте `env.local.example` в `.env.local`:
   ```bash
   cp env.local.example .env.local
   ```

2. Установите зависимости:
   ```bash
   npm install
   # или
   bun install
   ```

3. Запустите в режиме разработки:
   ```bash
   npm run dev
   # или
   bun dev
   ```

4. Для production сборки:
   ```bash
   npm run build
   npm start
   ```

## База данных (Self-Hosted Supabase)

<!-- Добавлена секция для self-hosted Supabase -->

### Первичная настройка

1. Установите self-hosted Supabase на ваш сервер (например, Beget)
2. Выполните полную миграцию из `scripts/full_database_with_content.sql`:
   - Откройте Supabase Studio → SQL Editor
   - Вставьте содержимое файла и выполните

### Что включает миграция:

- **9 таблиц**: admin_settings, announcements, hero_banner, news, products, product_analytics, production_carousel, site_content, site_settings
- **Индексы** для быстрого поиска
- **RLS политики** (разрешающие для anon ключа)
- **Storage buckets**: images, certificates, documents, uploads
- **Начальные данные**: контакты, тексты секций, настройки

### Важно!

RLS политики настроены как **permissive** (разрешающие все операции), что позволяет:
- Работать только с anon ключом (без service_role)
- Полноценно использовать админ панель
- Загружать файлы в Storage

## Хостинг на Beget

<!-- Добавлена секция для Beget -->

1. Создайте Node.js приложение в панели Beget
2. Загрузите файлы проекта
3. Создайте `.env.local` с ключами выше
4. Выполните:
   ```bash
   npm install
   npm run build
   ```
5. Настройте автозапуск через PM2:
   ```bash
   pm2 start npm --name "tdmedved" -- start
   pm2 save
   ```

## Хостинг без Vercel (VPS, Docker)

На других хостингах:

1. Создайте файл `.env.local` с переменными выше
2. Или добавьте переменные в настройки хостинга:
   - На Docker: через `-e` флаг или docker-compose
   - На VPS: через export или .bashrc
   - На Render/Railway: через Dashboard → Environment

## Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
ENV NEXT_PUBLIC_SUPABASE_URL=https://boupulabkeedum.beget.app
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY2NzA3MjAwLCJleHAiOjE5MjQ0NzM2MDB9.H45A51jxdBcwiuJjllfR8liD8VEiVrqmikCOUA8Dr9o
EXPOSE 3000
CMD ["npm", "start"]
```

## Примечание

Сайт работает **только с двумя переменными окружения**. Никаких дополнительных ключей (service_role, JWT secret и т.д.) не требуется. Все операции включая админ панель работают через anon ключ благодаря permissive RLS политикам.
