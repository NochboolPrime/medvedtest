-- Fix RLS policies to allow INSERT
DROP POLICY IF EXISTS "Allow authenticated write access" ON public.site_content;

CREATE POLICY "Allow authenticated insert"
ON public.site_content
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
ON public.site_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
ON public.site_content
FOR DELETE
TO authenticated
USING (true);

-- Add columns for visibility and template marking
ALTER TABLE public.site_content 
ADD COLUMN IF NOT EXISTS visible BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_template BOOLEAN DEFAULT false;

-- Mark existing items as templates for principles, services, and strategy
UPDATE public.site_content
SET is_template = true
WHERE key IN ('principle1Title', 'principle1Description', 'service1Title', 'service1Description', 'strategy1');
