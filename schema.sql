-- Script SQL untuk memperbarui / melengkapi struktur tabel site_config & tabel pendukung di Supabase

-- 1. Buat / Perbarui tabel site_config
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

-- Tambahkan kolom jika tabel site_config sudah ada sebelumnya tetapi belum punya kolom ini
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

-- Sisipkan data default jika belum ada
INSERT INTO site_config (id, groom_name, bride_name, main_quote, start_date)
VALUES ('00000000-0000-0000-0000-000000000001', 'Bripda Rival', 'Siti', 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.', '2021-02-14')
ON CONFLICT (id) DO NOTHING;
