-- Add translation fields to products table
alter table public.products
  add column if not exists title_en text,
  add column if not exists title_zh text,
  add column if not exists description_en text,
  add column if not exists description_zh text,
  add column if not exists full_description_en text,
  add column if not exists full_description_zh text,
  add column if not exists features_en text[],
  add column if not exists features_zh text[],
  add column if not exists advantages_en text[],
  add column if not exists advantages_zh text[],
  add column if not exists applications_en text[],
  add column if not exists applications_zh text[],
  -- Added specifications translations
  add column if not exists specifications_en jsonb default '[]'::jsonb,
  add column if not exists specifications_zh jsonb default '[]'::jsonb;

-- Create index for better performance
create index if not exists products_title_en_idx on public.products(title_en);
create index if not exists products_title_zh_idx on public.products(title_zh);
