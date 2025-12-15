-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  content_ru TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_zh TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  show_delay INTEGER DEFAULT 3000,
  auto_hide_delay INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow public to read only active announcements
CREATE POLICY "announcements_select_active_public"
  ON announcements FOR SELECT
  USING (is_active = true);

-- Allow service_role full access (for admin operations)
CREATE POLICY "announcements_all_service_role"
  ON announcements FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active) WHERE is_active = true;

-- Insert a sample announcement
INSERT INTO announcements (
  title_ru, title_en, title_zh,
  content_ru, content_en, content_zh,
  is_active, show_delay, auto_hide_delay
) VALUES (
  'Добро пожаловать!',
  'Welcome!',
  '欢迎！',
  'Мы рады приветствовать вас на нашем сайте. Ознакомьтесь с нашей продукцией и услугами.',
  'We are glad to welcome you to our website. Check out our products and services.',
  '我们很高兴欢迎您访问我们的网站。查看我们的产品和服务。',
  false,
  3000,
  10000
);
