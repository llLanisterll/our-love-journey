-- Script SQL Lengkap untuk Supabase (Mengatasi RLS & Menyiapkan Storage Bucket)

-- 1. Buat Tabel site_config jika belum ada
CREATE TABLE IF NOT EXISTS site_config (
    id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
    groom_name TEXT,
    bride_name TEXT,
    main_quote TEXT,
    start_date TEXT DEFAULT '2021-02-14',
    bg_music_url TEXT,
    cover_photo_url TEXT,
    groom_photo_url TEXT,
    bride_photo_url TEXT,
    spot1_title TEXT,
    spot1_name TEXT,
    spot1_address TEXT,
    spot1_desc TEXT,
    spot1_maps_url TEXT,
    spot2_title TEXT,
    spot2_name TEXT,
    spot2_address TEXT,
    spot2_desc TEXT,
    spot2_maps_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Pastikan semua kolom di site_config tersedia
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS start_date TEXT DEFAULT '2021-02-14';
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS groom_name TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS bride_name TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS main_quote TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS bg_music_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS groom_photo_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS bride_photo_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot1_title TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot1_name TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot1_address TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot1_desc TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot1_maps_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot2_title TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot2_name TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot2_address TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot2_desc TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS spot2_maps_url TEXT;
ALTER TABLE site_config ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Matikan Row Level Security (RLS) pada semua tabel CMS agar operasi CRUD tidak diblokir
ALTER TABLE site_config DISABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'timeline') THEN
        ALTER TABLE timeline DISABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gallery') THEN
        ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'chapters') THEN
        ALTER TABLE chapters DISABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- 4. Sisipkan Data Default di site_config jika belum ada
INSERT INTO site_config (id, groom_name, bride_name, main_quote, start_date)
VALUES ('00000000-0000-0000-0000-000000000001', 'Bripda Rival', 'Siti', 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.', '2021-02-14')
ON CONFLICT (id) DO NOTHING;

-- 5. Buat & Buka Akses Publik untuk Storage Bucket 'media' (Foto & Musik)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Storage Read" ON storage.objects;
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Public Storage Insert" ON storage.objects;
CREATE POLICY "Public Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Public Storage Update" ON storage.objects;
CREATE POLICY "Public Storage Update" ON storage.objects FOR UPDATE USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Public Storage Delete" ON storage.objects;
CREATE POLICY "Public Storage Delete" ON storage.objects FOR DELETE USING (bucket_id = 'media');
