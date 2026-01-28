-- Создание таблицы для хранения сертификатов
-- Выполните этот скрипт в Supabase SQL Editor

-- =====================================================
-- 1. УДАЛЕНИЕ СТАРОЙ ТАБЛИЦЫ certificates (если существует)
-- =====================================================
DROP TABLE IF EXISTS certificates CASCADE;

-- =====================================================
-- 2. СОЗДАНИЕ НОВОЙ ТАБЛИЦЫ certificates
-- =====================================================
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  title_en TEXT DEFAULT '',
  title_zh TEXT DEFAULT '',
  description TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_zh TEXT DEFAULT '',
  main_image TEXT NOT NULL DEFAULT '',
  gallery TEXT[] DEFAULT '{}',
  pdf_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. ВКЛЮЧЕНИЕ RLS И ПОЛИТИКИ
-- =====================================================
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read certificates" ON certificates;
CREATE POLICY "Allow public read certificates" ON certificates
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow full access certificates" ON certificates;
CREATE POLICY "Allow full access certificates" ON certificates
  FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- 4. СОЗДАНИЕ STORAGE BUCKET ДЛЯ СЕРТИФИКАТОВ (если нет)
-- =====================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[];

-- Политики для bucket certificates
DROP POLICY IF EXISTS "Allow public read certificates storage" ON storage.objects;
CREATE POLICY "Allow public read certificates storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Allow public upload certificates storage" ON storage.objects;
CREATE POLICY "Allow public upload certificates storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Allow public update certificates storage" ON storage.objects;
CREATE POLICY "Allow public update certificates storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'certificates') WITH CHECK (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Allow public delete certificates storage" ON storage.objects;
CREATE POLICY "Allow public delete certificates storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'certificates');
