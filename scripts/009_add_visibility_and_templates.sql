-- Add visible column to site_content table
ALTER TABLE public.site_content 
ADD COLUMN IF NOT EXISTS visible BOOLEAN DEFAULT true;

-- Add template column to mark items that can be duplicated
ALTER TABLE public.site_content 
ADD COLUMN IF NOT EXISTS is_template BOOLEAN DEFAULT false;

-- Update metadata to include order for proper sorting
UPDATE public.site_content 
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{order}',
  to_jsonb(0)
)
WHERE metadata->>'order' IS NULL;

-- Create index for visible items
CREATE INDEX IF NOT EXISTS idx_site_content_visible ON public.site_content(visible);

-- Set services and principles as templates
UPDATE public.site_content 
SET is_template = true 
WHERE section IN ('services', 'excellence') 
  AND key LIKE '%1%';
