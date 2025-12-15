-- Create hero_banner table for managing the main page banner
CREATE TABLE IF NOT EXISTS hero_banner (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE hero_banner ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Public can read active banner
CREATE POLICY "hero_banner_select_active_public" ON hero_banner
  FOR SELECT USING (is_active = true);

-- Service role can do everything (for admin operations)
CREATE POLICY "hero_banner_all_service_role" ON hero_banner
  FOR ALL USING (true);

-- Insert the current banner image
INSERT INTO hero_banner (image_url, is_active)
VALUES ('/images/nizkii-ugol-vystrela-sovremennogo-serogo-zdania-so-steklannymi-oknami.jpg', true);
