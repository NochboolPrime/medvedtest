-- Add video_url field to products table
alter table public.products
  add column if not exists video_url text;

-- Create index for video URL
create index if not exists products_video_url_idx on public.products(video_url);

-- Add comment
comment on column public.products.video_url is 'URL to Rutube video for product demonstration';
