-- ============================================
-- ПОЛНАЯ МИГРАЦИЯ БАЗЫ ДАННЫХ ТД МЕДВЕДЬ
-- Версия: 2.0 (с permissive политиками для anon)
-- Дата: 2025-01-26
-- ============================================
-- ВАЖНО: Эта версия использует открытые RLS политики
-- для работы только с ANON ключом (без SERVICE_ROLE)
-- ============================================

-- ============================================
-- 1. ТАБЛИЦА ADMIN_SETTINGS
-- Настройки администратора (хеш пароля)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "admin_settings_select_service" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_update_service" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_insert_service" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_select_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_insert_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_update_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_delete_all" ON admin_settings;

CREATE POLICY "admin_settings_select_all" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "admin_settings_insert_all" ON admin_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_settings_update_all" ON admin_settings FOR UPDATE USING (true);
CREATE POLICY "admin_settings_delete_all" ON admin_settings FOR DELETE USING (true);


-- ============================================
-- 2. ТАБЛИЦА ANNOUNCEMENTS
-- Объявления/анонсы на сайте
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  content_ru TEXT,
  content_en TEXT,
  content_zh TEXT,
  link_text_ru TEXT,
  link_text_en TEXT,
  link_text_zh TEXT,
  link_url TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  show_delay INTEGER DEFAULT 0,
  auto_hide_delay INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "announcements_select_active_public" ON announcements;
DROP POLICY IF EXISTS "announcements_all_service_role" ON announcements;
DROP POLICY IF EXISTS "announcements_select_all" ON announcements;
DROP POLICY IF EXISTS "announcements_insert_all" ON announcements;
DROP POLICY IF EXISTS "announcements_update_all" ON announcements;
DROP POLICY IF EXISTS "announcements_delete_all" ON announcements;

CREATE POLICY "announcements_select_all" ON announcements FOR SELECT USING (true);
CREATE POLICY "announcements_insert_all" ON announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "announcements_update_all" ON announcements FOR UPDATE USING (true);
CREATE POLICY "announcements_delete_all" ON announcements FOR DELETE USING (true);


-- ============================================
-- 3. ТАБЛИЦА HERO_BANNER
-- Баннеры на главной странице
-- ============================================
CREATE TABLE IF NOT EXISTS hero_banner (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE hero_banner ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "hero_banner_select_active_public" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_all_service_role" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_select_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_insert_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_update_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_delete_all" ON hero_banner;

CREATE POLICY "hero_banner_select_all" ON hero_banner FOR SELECT USING (true);
CREATE POLICY "hero_banner_insert_all" ON hero_banner FOR INSERT WITH CHECK (true);
CREATE POLICY "hero_banner_update_all" ON hero_banner FOR UPDATE USING (true);
CREATE POLICY "hero_banner_delete_all" ON hero_banner FOR DELETE USING (true);


-- ============================================
-- 4. ТАБЛИЦА NEWS
-- Новости/блог
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  content_ru TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_zh TEXT NOT NULL,
  excerpt_ru TEXT,
  excerpt_en TEXT,
  excerpt_zh TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS news_slug_idx ON news(slug);
CREATE INDEX IF NOT EXISTS news_published_idx ON news(is_published, published_at DESC);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "news_select_published_public" ON news;
DROP POLICY IF EXISTS "news_all_service_role" ON news;
DROP POLICY IF EXISTS "news_select_all" ON news;
DROP POLICY IF EXISTS "news_insert_all" ON news;
DROP POLICY IF EXISTS "news_update_all" ON news;
DROP POLICY IF EXISTS "news_delete_all" ON news;

CREATE POLICY "news_select_all" ON news FOR SELECT USING (true);
CREATE POLICY "news_insert_all" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "news_update_all" ON news FOR UPDATE USING (true);
CREATE POLICY "news_delete_all" ON news FOR DELETE USING (true);


-- ============================================
-- 5. ТАБЛИЦА PRODUCTS
-- Товары/продукция
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Русский (основной)
  title TEXT NOT NULL,
  description TEXT,
  full_description TEXT,
  features TEXT[] DEFAULT '{}',
  advantages TEXT[] DEFAULT '{}',
  applications TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  -- Английский
  title_en TEXT,
  description_en TEXT,
  full_description_en TEXT,
  features_en TEXT[] DEFAULT '{}',
  advantages_en TEXT[] DEFAULT '{}',
  applications_en TEXT[] DEFAULT '{}',
  specifications_en JSONB DEFAULT '{}',
  -- Китайский
  title_zh TEXT,
  description_zh TEXT,
  full_description_zh TEXT,
  features_zh TEXT[] DEFAULT '{}',
  advantages_zh TEXT[] DEFAULT '{}',
  applications_zh TEXT[] DEFAULT '{}',
  specifications_zh JSONB DEFAULT '{}',
  -- Общие поля
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  video_url TEXT,
  specification_pdf_url TEXT,
  price NUMERIC(10, 2),
  show_on_homepage BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_homepage_idx ON products(show_on_homepage);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "products_select_public" ON products;
DROP POLICY IF EXISTS "products_insert_service" ON products;
DROP POLICY IF EXISTS "products_update_service" ON products;
DROP POLICY IF EXISTS "products_delete_service" ON products;
DROP POLICY IF EXISTS "products_select_all" ON products;
DROP POLICY IF EXISTS "products_insert_all" ON products;
DROP POLICY IF EXISTS "products_update_all" ON products;
DROP POLICY IF EXISTS "products_delete_all" ON products;

CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_all" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "products_update_all" ON products FOR UPDATE USING (true);
CREATE POLICY "products_delete_all" ON products FOR DELETE USING (true);


-- ============================================
-- 6. ТАБЛИЦА PRODUCT_ANALYTICS
-- Аналитика просмотров товаров
-- ============================================
CREATE TABLE IF NOT EXISTS product_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_analytics_product_idx ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS product_analytics_event_idx ON product_analytics(event_type);
CREATE INDEX IF NOT EXISTS product_analytics_date_idx ON product_analytics(created_at);

ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "Allow select for all" ON product_analytics;
DROP POLICY IF EXISTS "Allow insert for tracking" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_select_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_insert_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_update_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_delete_all" ON product_analytics;

CREATE POLICY "product_analytics_select_all" ON product_analytics FOR SELECT USING (true);
CREATE POLICY "product_analytics_insert_all" ON product_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "product_analytics_update_all" ON product_analytics FOR UPDATE USING (true);
CREATE POLICY "product_analytics_delete_all" ON product_analytics FOR DELETE USING (true);


-- ============================================
-- 7. ТАБЛИЦА PRODUCTION_CAROUSEL
-- Карусель производства
-- ============================================
CREATE TABLE IF NOT EXISTS production_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption_ru TEXT,
  caption_en TEXT,
  caption_zh TEXT,
  order_index INTEGER DEFAULT 0,
  auto_slide_interval INTEGER DEFAULT 5000,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS production_carousel_order_idx ON production_carousel(order_index);

ALTER TABLE production_carousel ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "production_carousel_select_visible_public" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_all_service_role" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_select_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_insert_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_update_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_delete_all" ON production_carousel;

CREATE POLICY "production_carousel_select_all" ON production_carousel FOR SELECT USING (true);
CREATE POLICY "production_carousel_insert_all" ON production_carousel FOR INSERT WITH CHECK (true);
CREATE POLICY "production_carousel_update_all" ON production_carousel FOR UPDATE USING (true);
CREATE POLICY "production_carousel_delete_all" ON production_carousel FOR DELETE USING (true);


-- ============================================
-- 8. ТАБЛИЦА SITE_CONTENT
-- Контент сайта (переводы, тексты)
-- ============================================
CREATE TABLE IF NOT EXISTS site_content (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value_ru TEXT,
  value_en TEXT,
  value_zh TEXT,
  content_type TEXT DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  visible BOOLEAN DEFAULT true,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

CREATE INDEX IF NOT EXISTS site_content_section_idx ON site_content(section);
CREATE INDEX IF NOT EXISTS site_content_key_idx ON site_content(key);
CREATE INDEX IF NOT EXISTS site_content_section_key_idx ON site_content(section, key);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "site_content_public_read" ON site_content;
DROP POLICY IF EXISTS "site_content_admin_write" ON site_content;
DROP POLICY IF EXISTS "site_content_admin_update" ON site_content;
DROP POLICY IF EXISTS "site_content_admin_delete" ON site_content;
DROP POLICY IF EXISTS "Allow authenticated insert" ON site_content;
DROP POLICY IF EXISTS "Allow authenticated update" ON site_content;
DROP POLICY IF EXISTS "Allow authenticated delete" ON site_content;
DROP POLICY IF EXISTS "site_content_select_all" ON site_content;
DROP POLICY IF EXISTS "site_content_insert_all" ON site_content;
DROP POLICY IF EXISTS "site_content_update_all" ON site_content;
DROP POLICY IF EXISTS "site_content_delete_all" ON site_content;

CREATE POLICY "site_content_select_all" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content_insert_all" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "site_content_update_all" ON site_content FOR UPDATE USING (true);
CREATE POLICY "site_content_delete_all" ON site_content FOR DELETE USING (true);


-- ============================================
-- 9. ТАБЛИЦА SITE_SETTINGS
-- Настройки сайта (включение/отключение разделов)
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS site_settings_key_idx ON site_settings(key);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Permissive policies для работы с anon ключом
DROP POLICY IF EXISTS "site_settings_select_public" ON site_settings;
DROP POLICY IF EXISTS "site_settings_all_service_role" ON site_settings;
DROP POLICY IF EXISTS "site_settings_select_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_insert_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_update_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_delete_all" ON site_settings;

CREATE POLICY "site_settings_select_all" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_insert_all" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "site_settings_update_all" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "site_settings_delete_all" ON site_settings FOR DELETE USING (true);


-- ============================================
-- 10. SUPABASE STORAGE BUCKETS
-- Хранилище файлов
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']),
  ('certificates', 'certificates', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('documents', 'documents', true, 10485760, ARRAY['application/pdf']),
  ('uploads', 'uploads', true, 10485760, NULL)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Permissive Storage policies для работы с anon ключом
DROP POLICY IF EXISTS "images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "images_service_insert" ON storage.objects;
DROP POLICY IF EXISTS "images_service_update" ON storage.objects;
DROP POLICY IF EXISTS "images_service_delete" ON storage.objects;
DROP POLICY IF EXISTS "certificates_public_read" ON storage.objects;
DROP POLICY IF EXISTS "certificates_service_insert" ON storage.objects;
DROP POLICY IF EXISTS "certificates_service_update" ON storage.objects;
DROP POLICY IF EXISTS "certificates_service_delete" ON storage.objects;
DROP POLICY IF EXISTS "documents_public_read" ON storage.objects;
DROP POLICY IF EXISTS "documents_service_insert" ON storage.objects;
DROP POLICY IF EXISTS "documents_service_update" ON storage.objects;
DROP POLICY IF EXISTS "documents_service_delete" ON storage.objects;
DROP POLICY IF EXISTS "uploads_public_read" ON storage.objects;
DROP POLICY IF EXISTS "uploads_service_insert" ON storage.objects;
DROP POLICY IF EXISTS "uploads_service_update" ON storage.objects;
DROP POLICY IF EXISTS "uploads_service_delete" ON storage.objects;
DROP POLICY IF EXISTS "storage_select_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_insert_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_update_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_delete_all" ON storage.objects;

CREATE POLICY "storage_select_all" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "storage_insert_all" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "storage_update_all" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "storage_delete_all" ON storage.objects FOR DELETE USING (true);


-- ============================================
-- 11. НАЧАЛЬНЫЕ ДАННЫЕ
-- ============================================

-- Настройки сайта по умолчанию
INSERT INTO site_settings (key, value)
VALUES 
  ('news_enabled', true),
  ('yandex_metrika_enabled', false),
  ('yandex_metrika_id', false)
ON CONFLICT (key) DO NOTHING;

-- Контактная информация по умолчанию
INSERT INTO site_content (section, key, value_ru, value_en, value_zh)
VALUES 
  ('contact', 'phone', '+7 (495) 777-56-00', '+7 (495) 777-56-00', '+7 (495) 777-56-00'),
  ('contact', 'email', 'info@aomedved.ru', 'info@aomedved.ru', 'info@aomedved.ru'),
  ('contact', 'address', '107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3', '107031, Moscow, Bolshaya Dmitrovka str., 32, bld. 9, office 3', '107031，莫斯科，大德米特罗夫卡街32号，9栋，3室')
ON CONFLICT (section, key) DO NOTHING;


-- ============================================
-- КОНЕЦ МИГРАЦИИ
-- ============================================
