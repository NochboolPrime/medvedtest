-- Create table for site content management
CREATE TABLE IF NOT EXISTS public.site_content (
  id BIGSERIAL PRIMARY KEY,
  section TEXT NOT NULL, -- hero, about, services, contact, footer, etc.
  key TEXT NOT NULL, -- title, description, feature1, etc.
  content_type TEXT NOT NULL DEFAULT 'text', -- text, array, json, image
  value_ru TEXT,
  value_en TEXT,
  value_zh TEXT,
  metadata JSONB DEFAULT '{}'::jsonb, -- For additional data like order, icons, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_content_section ON public.site_content(section);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON public.site_content(key);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Allow public read access"
ON public.site_content
FOR SELECT
TO public
USING (true);

-- Policy for authenticated write access (admin only)
CREATE POLICY "Allow authenticated write access"
ON public.site_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION update_site_content_updated_at();
