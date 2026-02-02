-- Add translation fields for product category
alter table public.products
  add column if not exists category_en text,
  add column if not exists category_zh text;

-- Create indexes for better performance
create index if not exists products_category_en_idx on public.products(category_en);
create index if not exists products_category_zh_idx on public.products(category_zh);
