-- Add specification_pdf_url field to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS specification_pdf_url TEXT;

-- Update RLS policies to allow service role to update this field
-- Policies already exist, so no changes needed
