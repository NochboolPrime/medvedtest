-- =====================================================
-- ПОЛНАЯ МИГРАЦИЯ БАЗЫ ДАННЫХ ТД МЕДВЕДЬ
-- Версия: 3.0 (с данными для self-hosted Supabase)
-- Дата: 2025-01-15
-- =====================================================
-- Работает с двумя ключами:
-- NEXT_PUBLIC_SUPABASE_URL
-- NEXT_PUBLIC_SUPABASE_ANON_KEY
-- =====================================================

-- =====================================================
-- ЧАСТЬ 1: СОЗДАНИЕ ТАБЛИЦ
-- =====================================================

-- Таблица настроек администратора
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица анонсов
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ru TEXT NOT NULL,
  title_en TEXT,
  title_zh TEXT,
  content_ru TEXT,
  content_en TEXT,
  content_zh TEXT,
  image_url TEXT,
  link_url TEXT,
  link_text_ru TEXT,
  link_text_en TEXT,
  link_text_zh TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица hero баннера
CREATE TABLE IF NOT EXISTS hero_banner (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT,
  video_url TEXT,
  title_ru TEXT,
  title_en TEXT,
  title_zh TEXT,
  subtitle_ru TEXT,
  subtitle_en TEXT,
  subtitle_zh TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица новостей
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

-- Таблица продуктов
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description_ru TEXT,
  description_en TEXT,
  description_zh TEXT,
  category TEXT,
  image_url TEXT,
  specifications JSONB DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  specification_pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица аналитики продуктов
CREATE TABLE IF NOT EXISTS product_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица карусели производства
CREATE TABLE IF NOT EXISTS production_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption_ru TEXT,
  caption_en TEXT,
  caption_zh TEXT,
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  auto_slide_interval INTEGER DEFAULT 3000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица контента сайта
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  value_ru TEXT,
  value_en TEXT,
  value_zh TEXT,
  metadata JSONB DEFAULT '{}',
  visible BOOLEAN DEFAULT true,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ЧАСТЬ 2: ИНДЕКСЫ
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_visible);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);
CREATE INDEX IF NOT EXISTS idx_site_content_section_key ON site_content(section, key);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_production_carousel_order ON production_carousel(order_index);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);

-- =====================================================
-- ЧАСТЬ 3: RLS ПОЛИТИКИ (РАЗРЕШАЮЩИЕ ДЛЯ ANON)
-- =====================================================

-- Включаем RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banner ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_carousel ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admin Settings - полный доступ
DROP POLICY IF EXISTS "admin_settings_select_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_insert_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_update_all" ON admin_settings;
DROP POLICY IF EXISTS "admin_settings_delete_all" ON admin_settings;
CREATE POLICY "admin_settings_select_all" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "admin_settings_insert_all" ON admin_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_settings_update_all" ON admin_settings FOR UPDATE USING (true);
CREATE POLICY "admin_settings_delete_all" ON admin_settings FOR DELETE USING (true);

-- Announcements - полный доступ
DROP POLICY IF EXISTS "announcements_select_all" ON announcements;
DROP POLICY IF EXISTS "announcements_insert_all" ON announcements;
DROP POLICY IF EXISTS "announcements_update_all" ON announcements;
DROP POLICY IF EXISTS "announcements_delete_all" ON announcements;
CREATE POLICY "announcements_select_all" ON announcements FOR SELECT USING (true);
CREATE POLICY "announcements_insert_all" ON announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "announcements_update_all" ON announcements FOR UPDATE USING (true);
CREATE POLICY "announcements_delete_all" ON announcements FOR DELETE USING (true);

-- Hero Banner - полный доступ
DROP POLICY IF EXISTS "hero_banner_select_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_insert_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_update_all" ON hero_banner;
DROP POLICY IF EXISTS "hero_banner_delete_all" ON hero_banner;
CREATE POLICY "hero_banner_select_all" ON hero_banner FOR SELECT USING (true);
CREATE POLICY "hero_banner_insert_all" ON hero_banner FOR INSERT WITH CHECK (true);
CREATE POLICY "hero_banner_update_all" ON hero_banner FOR UPDATE USING (true);
CREATE POLICY "hero_banner_delete_all" ON hero_banner FOR DELETE USING (true);

-- News - полный доступ
DROP POLICY IF EXISTS "news_select_all" ON news;
DROP POLICY IF EXISTS "news_insert_all" ON news;
DROP POLICY IF EXISTS "news_update_all" ON news;
DROP POLICY IF EXISTS "news_delete_all" ON news;
CREATE POLICY "news_select_all" ON news FOR SELECT USING (true);
CREATE POLICY "news_insert_all" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "news_update_all" ON news FOR UPDATE USING (true);
CREATE POLICY "news_delete_all" ON news FOR DELETE USING (true);

-- Products - полный доступ
DROP POLICY IF EXISTS "products_select_all" ON products;
DROP POLICY IF EXISTS "products_insert_all" ON products;
DROP POLICY IF EXISTS "products_update_all" ON products;
DROP POLICY IF EXISTS "products_delete_all" ON products;
CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_all" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "products_update_all" ON products FOR UPDATE USING (true);
CREATE POLICY "products_delete_all" ON products FOR DELETE USING (true);

-- Product Analytics - полный доступ
DROP POLICY IF EXISTS "product_analytics_select_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_insert_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_update_all" ON product_analytics;
DROP POLICY IF EXISTS "product_analytics_delete_all" ON product_analytics;
CREATE POLICY "product_analytics_select_all" ON product_analytics FOR SELECT USING (true);
CREATE POLICY "product_analytics_insert_all" ON product_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "product_analytics_update_all" ON product_analytics FOR UPDATE USING (true);
CREATE POLICY "product_analytics_delete_all" ON product_analytics FOR DELETE USING (true);

-- Production Carousel - полный доступ
DROP POLICY IF EXISTS "production_carousel_select_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_insert_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_update_all" ON production_carousel;
DROP POLICY IF EXISTS "production_carousel_delete_all" ON production_carousel;
CREATE POLICY "production_carousel_select_all" ON production_carousel FOR SELECT USING (true);
CREATE POLICY "production_carousel_insert_all" ON production_carousel FOR INSERT WITH CHECK (true);
CREATE POLICY "production_carousel_update_all" ON production_carousel FOR UPDATE USING (true);
CREATE POLICY "production_carousel_delete_all" ON production_carousel FOR DELETE USING (true);

-- Site Content - полный доступ
DROP POLICY IF EXISTS "site_content_select_all" ON site_content;
DROP POLICY IF EXISTS "site_content_insert_all" ON site_content;
DROP POLICY IF EXISTS "site_content_update_all" ON site_content;
DROP POLICY IF EXISTS "site_content_delete_all" ON site_content;
CREATE POLICY "site_content_select_all" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content_insert_all" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "site_content_update_all" ON site_content FOR UPDATE USING (true);
CREATE POLICY "site_content_delete_all" ON site_content FOR DELETE USING (true);

-- Site Settings - полный доступ
DROP POLICY IF EXISTS "site_settings_select_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_insert_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_update_all" ON site_settings;
DROP POLICY IF EXISTS "site_settings_delete_all" ON site_settings;
CREATE POLICY "site_settings_select_all" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_insert_all" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "site_settings_update_all" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "site_settings_delete_all" ON site_settings FOR DELETE USING (true);

-- =====================================================
-- ЧАСТЬ 4: STORAGE BUCKETS И ПОЛИТИКИ
-- =====================================================

-- Создаем buckets
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

-- Storage политики - полный доступ для anon
DROP POLICY IF EXISTS "storage_select_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_insert_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_update_all" ON storage.objects;
DROP POLICY IF EXISTS "storage_delete_all" ON storage.objects;
CREATE POLICY "storage_select_all" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "storage_insert_all" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "storage_update_all" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "storage_delete_all" ON storage.objects FOR DELETE USING (true);

-- =====================================================
-- ЧАСТЬ 5: НАЧАЛЬНЫЕ ДАННЫЕ
-- =====================================================

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('news_enabled', true),
  ('yandex_metrika_enabled', false),
  ('yandex_metrika_id', false)
ON CONFLICT (key) DO NOTHING;

-- Site Content - О компании
INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible) VALUES
  ('about', 'title', 'text', 'ТД Медведь', 'TD Medved', 'TD Medved', '{"order":1}', true),
  ('about', 'mission', 'text', 'Ведение деятельности по производству, продвижению и поддержке современных, эффективных, качественных, безопасных решений и специализированных механизмов используемых предприятиями-партнерами для решения их производственных задач с соблюдением принципов и ценностей обеспечивающих долгосрочный успех и устойчивое развитие наших партнеров, сотрудников и общества в целом', 'We create a sustainable, multifaceted and independent company through investments in people, technology and production facilities.', '我们通过对人才、技术和生产设施的投资，打造一个可持续、多元化和独立的公司。', '{"order":2}', true),
  ('about', 'principlesTitle', 'text', 'Наши принципы', 'Our Principles', '我们的原则', '{"order":3}', true),
  ('about', 'principle1', 'text', 'Системность и многогранность — комплексный, взвешенный подход: анализируем задачу глубоко и со всех сторон, принимаем решения обоснованно', 'Business versatility — development of several areas of activity', '业务多样性 - 发展多个业务领域', '{"index":0,"order":4}', true),
  ('about', 'principle2', 'text', 'Честность и открытость — прозрачное и достоверное освещение деятельности', 'Honesty and openness — transparent and accurate coverage of activities', '诚实和开放 - 透明准确地报道活动', '{"index":1,"order":5}', true),
  ('about', 'principle3', 'text', 'Долгосрочность и устойчивость — стремление выстраивать долгосрочные и надежные партнерские отношения', 'Long-term sustainability — striving to build long-term and reliable partnerships', '长期可持续性 - 努力建立长期可靠的合作伙伴关系', '{"index":2,"order":6}', true),
  ('about', 'principle4', 'text', 'Безопасность — соблюдение требований законодательства в области безопасности', 'Safety — compliance with safety legislation requirements', '安全 - 遵守安全法规要求', '{"index":3,"order":7}', true),
  ('about', 'principle5', 'text', 'Социальная ответственность — ответственное отношение к своей деятельности, производство качественной продукции, уплата налогов, содействие благополучию региона присутствия', 'Social responsibility — responsible approach to our activities', '社会责任 - 对我们的活动采取负责任的态度', '{"index":4,"order":8}', true),
  ('about', 'certificatesTitle', 'text', 'Сертификаты', 'Certificates', '证书', '{"order":13}', true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Site Content - Контакты
INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible) VALUES
  ('contact', 'address', 'text', '107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3', '107031, Moscow, Bolshaya Dmitrovka str., 32, bld. 9, room 3', '107031, 莫斯科, 大德米特罗夫卡街32号, 9号楼, 3室', '{"order":1}', true),
  ('contact', 'email', 'text', 'info@aomedved.ru', 'info@aomedved.ru', 'info@aomedved.ru', '{"order":2}', true),
  ('contact', 'phone', 'text', '+7 (495) 777-56-00', '+7 (495) 777-56-00', '+7 (495) 777-56-00', '{"order":3}', true),
  ('contact', 'addressLabel', 'text', 'Адрес', 'Address', '地址', '{"order":4}', true),
  ('contact', 'emailLabel', 'text', 'Эл. почта', 'Email', '电子邮件', '{"order":5}', true),
  ('contact', 'phoneLabel', 'text', 'Телефон', 'Phone', '电话', '{"order":6}', true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Site Content - Hero секция
INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible) VALUES
  ('hero', 'title', 'text', 'ТД Медведь', 'TD Medved', 'TD Medved', '{"order":1}', true),
  ('hero', 'subtitle', 'text', 'Производство и поставка оборудования для нефтегазовой отрасли', 'Production and supply of equipment for the oil and gas industry', '石油天然气行业设备的生产和供应', '{"order":2}', true),
  ('hero', 'button1Text', 'text', 'Каталог продукции', 'Product Catalog', '产品目录', '{"order":3}', true),
  ('hero', 'button2Text', 'text', 'Связаться с нами', 'Contact Us', '联系我们', '{"order":4}', true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Site Content - Услуги
INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible) VALUES
  ('services', 'title', 'text', 'Наши услуги', 'Our Services', '我们的服务', '{"order":1}', true),
  ('services', 'subtitle', 'text', 'Полный спектр услуг для нефтегазовой отрасли', 'Full range of services for the oil and gas industry', '石油天然气行业的全方位服务', '{"order":2}', true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Site Content - Продукция
INSERT INTO site_content (section, key, content_type, value_ru, value_en, value_zh, metadata, visible) VALUES
  ('products', 'title', 'text', 'Наша продукция', 'Our Products', '我们的产品', '{"order":1}', true),
  ('products', 'subtitle', 'text', 'Высококачественное оборудование для нефтегазовой промышленности', 'High-quality equipment for the oil and gas industry', '石油天然气行业的高品质设备', '{"order":2}', true)
ON CONFLICT (section, key) DO UPDATE SET
  value_ru = EXCLUDED.value_ru,
  value_en = EXCLUDED.value_en,
  value_zh = EXCLUDED.value_zh,
  metadata = EXCLUDED.metadata;

-- Тестовая новость
INSERT INTO news (title_ru, title_en, title_zh, content_ru, content_en, content_zh, excerpt_ru, excerpt_en, excerpt_zh, slug, is_published, published_at)
VALUES (
  'Добро пожаловать в наш блог!',
  'Welcome to our blog!',
  '欢迎来到我们的博客！',
  '<h2>Мы рады приветствовать вас</h2><p>Добро пожаловать на страницу новостей ТД Медведь! Здесь вы найдете последние обновления о нашей компании, новые продукты и важные объявления.</p>',
  '<h2>We are glad to welcome you</h2><p>Welcome to TD Medved news page! Here you will find the latest updates about our company, new products and important announcements.</p>',
  '<h2>我们很高兴欢迎您</h2><p>欢迎来到TD Medved新闻页面！在这里您将找到有关我们公司的最新更新、新产品和重要公告。</p>',
  'Добро пожаловать на страницу новостей ТД Медведь!',
  'Welcome to TD Medved news page!',
  '欢迎来到TD Medved新闻页面！',
  'welcome-to-our-blog',
  true,
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- КОНЕЦ МИГРАЦИИ
-- =====================================================
