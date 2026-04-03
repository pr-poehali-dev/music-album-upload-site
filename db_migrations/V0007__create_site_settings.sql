CREATE TABLE t_p67244302_music_album_upload_s.site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p67244302_music_album_upload_s.site_settings (key, value) VALUES
('hero_title_line1', 'СЛУШАЙ'),
('hero_title_line2', 'ПО-'),
('hero_title_line3', 'ДРУГОМУ'),
('hero_subtitle', 'Откройте для себя альбомы, которые меняют восприятие звука. Музыка, отобранная для тех, кто ценит каждую ноту.'),
('hero_badge', 'Новые релизы 2024'),
('cta_title', 'ГОТОВ ОТКРЫТЬ НОВУЮ МУЗЫКУ?'),
('cta_subtitle', 'Тысячи альбомов по всем жанрам — от классики до самых смелых экспериментов');
