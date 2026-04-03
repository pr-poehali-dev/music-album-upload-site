-- The Cure - Greatest Hits (2001)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/7c1cca2a-4954-4569-ab58-74f198f29714/5808354203-1200.jpg'
WHERE title = 'Greatest Hits' AND artist = 'the cure';

-- The Sisters of Mercy - Floodland (1987)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/cf2cbb78-ede0-3cb0-8713-2e548793aac9/11991286195-1200.jpg'
WHERE title = 'Floodland' AND artist = 'The Sisters of Mercy';

-- The Sisters of Mercy - Pornography → это фактически альбом с треками The Cure, обновим обложку тоже
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/cf2cbb78-ede0-3cb0-8713-2e548793aac9/11991286195-1200.jpg',
    title = 'Some Girls Wander by Mistake',
    year = 1992
WHERE title = 'Pornography' AND artist = 'The Sisters of Mercy';

-- Bauhaus - In the Flat Field (1980)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/294da88f-2391-437b-a486-169721fa1c57/16955444393-1200.jpg'
WHERE title = 'In the Flat Field' AND artist = 'Bauhaus';

-- Bauhaus - Mask (1981)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/b93bd931-dc51-4dc6-961c-05a3e27b5142/3072458247-500.jpg'
WHERE title = 'Mask' AND artist = 'Bauhaus';

-- Siouxsie and the Banshees - Kaleidoscope (1980)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/0d08f58d-be95-329d-9e20-ab36d39f9270/38617926228-1200.jpg'
WHERE title = 'Kaleidoscope' AND artist = 'Siouxsie and the Banshees';

-- Joy Division - Closer (1980)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/caf17f1e-56b9-4203-9495-be162e7879ed/33566717025-1200.jpg'
WHERE title = 'Closer' AND artist = 'Joy Division';

-- Paradise Lost - Gothic (1991)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/11fa94ea-d54a-4877-aa5d-27d99a0f3951/13473787146-500.jpg'
WHERE title = 'Gothic' AND artist = 'Paradise Lost';

-- Dead Can Dance - Spleen et Ideal (1985)
UPDATE t_p67244302_music_album_upload_s.albums
SET cover_url = 'https://coverartarchive.org/release/c30d38aa-cc89-4413-91a4-c7f8b083973a/37122634500-1200.jpg'
WHERE title = 'Spleen et Ideal' AND artist = 'Dead Can Dance';
