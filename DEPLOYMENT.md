# Инструкция по развертыванию на хостинге

## Переменные окружения

Для работы сайта необходимо создать файл `.env.local` в корне проекта с двумя ключами:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tpkkueyxliiythanmebw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwa2t1ZXl4bGlpeXRoYW5tZWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTk0MjEsImV4cCI6MjA3OTE5NTQyMX0.ASWnENWORpvCs2RXp37M5TGfGRzjU6HSeenAdJrAqrU
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

## База данных

Для воссоздания базы данных используйте скрипт `scripts/full_database_migration.sql` в Supabase SQL Editor.

## Хостинг без Vercel

На других хостингах (VPS, Docker, etc.):

1. Создайте файл `.env.local` с переменными выше
2. Или добавьте переменные в настройки хостинга:
   - На Docker: через `-e` флаг или docker-compose
   - На VPS: через export или .bashrc
   - На Render/Railway: через Dashboard → Environment

## Примечание

Сайт работает только с двумя переменными окружения. Никаких дополнительных ключей не требуется.
