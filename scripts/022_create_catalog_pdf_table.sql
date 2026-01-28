-- Создание таблицы для хранения PDF каталога
-- Выполните этот скрипт в Supabase SQL Editor

-- =====================================================
-- 1. УДАЛЕНИЕ СТАРОЙ ТАБЛИЦЫ catalog_pdf (если существует)
-- =====================================================
DROP TABLE IF EXISTS catalog_pdf CASCADE;

-- =====================================================
-- 2. СОЗДАНИЕ НОВОЙ ТАБЛИЦЫ catalog_pdf
-- =====================================================
CREATE TABLE catalog_pdf (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pdf_url TEXT NOT NULL DEFAULT '',
  title TEXT DEFAULT 'Каталог продукции',
  title_en TEXT DEFAULT 'Product Catalog',
  title_zh TEXT DEFAULT '产品目录',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставляем начальную запись (без PDF)
INSERT INTO catalog_pdf (id, pdf_url, title, title_en, title_zh)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '',
  'Каталог продукции',
  'Product Catalog',
  '产品目录'
) ON CONFLICT (id) DO NOTHING;

-- Включаем RLS
ALTER TABLE catalog_pdf ENABLE ROW LEVEL SECURITY;

-- Политика для публичного чтения
DROP POLICY IF EXISTS "Allow public read catalog_pdf" ON catalog_pdf;
CREATE POLICY "Allow public read catalog_pdf" ON catalog_pdf
  FOR SELECT USING (true);

-- Политика для полного доступа (для админа через service role)
DROP POLICY IF EXISTS "Allow full access catalog_pdf" ON catalog_pdf;
CREATE POLICY "Allow full access catalog_pdf" ON catalog_pdf
  FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- 3. СОЗДАНИЕ STORAGE BUCKET ДЛЯ ДОКУМЕНТОВ
-- =====================================================
-- ВАЖНО: Этот блок нужно выполнить ОТДЕЛЬНО в Supabase Dashboard
-- или через SQL если у вас есть доступ к storage schema

-- Создание bucket "documents" (выполните в SQL Editor):
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  52428800, -- 50MB лимит
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf']::text[];

-- Политики для bucket documents (разрешаем всем загружать и читать)
DROP POLICY IF EXISTS "Allow public read documents" ON storage.objects;
CREATE POLICY "Allow public read documents" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'documents');

DROP POLICY IF EXISTS "Allow public upload documents" ON storage.objects;
CREATE POLICY "Allow public upload documents" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'documents');

DROP POLICY IF EXISTS "Allow public update documents" ON storage.objects;
CREATE POLICY "Allow public update documents" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'documents')
  WITH CHECK (bucket_id = 'documents');

DROP POLICY IF EXISTS "Allow public delete documents" ON storage.objects;
CREATE POLICY "Allow public delete documents" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'documents');
