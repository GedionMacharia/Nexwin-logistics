-- Run this file in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  title text not null,
  level text,
  word_count text,
  reference_style text,
  deadline date,
  budget text,
  details text not null,
  status text not null default 'New inquiry',
  admin_notes text,
  file_paths text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- All writes and reads are performed by server routes using the service role.
-- Do not create public read/write policies for this table.
revoke all on public.inquiries from anon, authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'inquiry-files','inquiry-files',false,8388608,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain','image/jpeg','image/png'
  ]
)
on conflict (id) do update set public=false,file_size_limit=8388608;

-- Storage is private. Server routes use the service role to upload and create
-- short-lived signed links after administrator authentication.
