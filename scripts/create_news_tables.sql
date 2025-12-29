-- Create table for news/blog posts
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

-- Create table for site settings (for enabling/disabling features)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default setting for news tab
INSERT INTO site_settings (key, value)
VALUES ('news_enabled', true)
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news table
CREATE POLICY "news_select_published_public" ON news
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "news_all_service_role" ON news
  FOR ALL
  USING (auth.role() = 'service_role');

-- RLS Policies for site_settings table
CREATE POLICY "site_settings_select_public" ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "site_settings_all_service_role" ON site_settings
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS news_slug_idx ON news(slug);
CREATE INDEX IF NOT EXISTS news_published_idx ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS site_settings_key_idx ON site_settings(key);
