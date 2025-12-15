-- Create products table with full structure matching existing code
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  slug text not null unique,
  category text not null,
  price numeric not null default 0,
  image text not null,
  gallery text[] default array[]::text[],
  features text[] not null default array[]::text[],
  full_description text not null,
  specifications jsonb not null default '[]'::jsonb,
  advantages text[] not null default array[]::text[],
  applications text[] not null default array[]::text[],
  show_on_homepage boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create admin_settings table for password
create table if not exists public.admin_settings (
  id uuid primary key default gen_random_uuid(),
  password_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.admin_settings enable row level security;

-- Public can read products
create policy "products_select_public"
  on public.products for select
  using (true);

-- Only allow admin operations (we'll handle auth in app logic)
create policy "products_insert_service"
  on public.products for insert
  with check (true);

create policy "products_update_service"
  on public.products for update
  using (true);

create policy "products_delete_service"
  on public.products for delete
  using (true);

-- Admin settings policies
create policy "admin_settings_select_service"
  on public.admin_settings for select
  using (true);

create policy "admin_settings_insert_service"
  on public.admin_settings for insert
  with check (true);

create policy "admin_settings_update_service"
  on public.admin_settings for update
  using (true);

-- Create index for slug lookup
create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_homepage_idx on public.products(show_on_homepage);
