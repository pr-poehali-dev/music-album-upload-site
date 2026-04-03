INSERT INTO t_p67244302_music_album_upload_s.albums (title, artist, genre, year, tracks, cover_url) VALUES
('Kaleidoscope', 'Siouxsie and the Banshees', 'Gothic', 1980, 9, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/f4799059-1018-4229-b6fc-5a25e6d4fb0c.jpg'),
('Closer', 'Joy Division', 'Gothic', 1980, 10, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/0ca5dba7-0d35-499b-9a9e-61d739bcca10.jpg'),
('Aura', 'Clan of Xymox', 'Gothic', 1989, 9, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/bce9e775-f8e7-4f38-a177-74ef6fe71902.jpg'),
('Gothic', 'Paradise Lost', 'Gothic', 1991, 8, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/d64612a0-05cd-4134-a442-31d2eb443e50.jpg'),
('Ophelia', 'Lycia', 'Gothic', 1996, 8, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/389b5915-c48f-4f7a-8333-8dff4e224700.jpg'),
('Spleen et Ideal', 'Dead Can Dance', 'Gothic', 1985, 9, 'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/1a391b4d-ba64-40e2-9d93-63d89f208bba.jpg');

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Kaleidoscope', 'Happy House', '3:57', 1),
  ('Kaleidoscope', 'Tenant', '3:35', 2),
  ('Kaleidoscope', 'Trophy', '4:08', 3),
  ('Kaleidoscope', 'Hybrid', '4:22', 4),
  ('Kaleidoscope', 'Clockface', '3:47', 5),
  ('Kaleidoscope', 'Lunar Camel', '4:15', 6),
  ('Kaleidoscope', 'Christine', '3:29', 7),
  ('Kaleidoscope', 'Desert Kisses', '3:53', 8),
  ('Kaleidoscope', 'Red Light', '4:01', 9)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Siouxsie and the Banshees';

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Closer', 'Atrocity Exhibition', '6:06', 1),
  ('Closer', 'Isolation', '2:53', 2),
  ('Closer', 'Passover', '4:55', 3),
  ('Closer', 'Colony', '3:56', 4),
  ('Closer', 'A Means to an End', '4:07', 5),
  ('Closer', 'Heart and Soul', '5:51', 6),
  ('Closer', 'Twenty Four Hours', '4:26', 7),
  ('Closer', 'The Eternal', '6:07', 8),
  ('Closer', 'Decades', '6:11', 9),
  ('Closer', 'Homage', '1:38', 10)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Joy Division';

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Aura', 'A Day', '5:12', 1),
  ('Aura', 'Consolation', '4:47', 2),
  ('Aura', 'Stranger', '5:33', 3),
  ('Aura', 'Loneliness', '5:08', 4),
  ('Aura', 'At the End of the Day', '6:02', 5),
  ('Aura', 'Shame', '4:55', 6),
  ('Aura', 'Kindness', '5:21', 7),
  ('Aura', 'This World', '4:38', 8),
  ('Aura', 'Aura', '7:14', 9)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Clan of Xymox';

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Gothic', 'Gothic', '6:35', 1),
  ('Gothic', 'Dead Emotion', '5:12', 2),
  ('Gothic', 'Sealed in Pity', '5:48', 3),
  ('Gothic', 'Turning Misery', '4:57', 4),
  ('Gothic', 'Johns', '5:24', 5),
  ('Gothic', 'Shattered', '6:03', 6),
  ('Gothic', 'Rape of Virtue', '5:41', 7),
  ('Gothic', 'Pure Agony', '4:38', 8)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Paradise Lost';

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Ophelia', 'Ophelia', '7:42', 1),
  ('Ophelia', 'Fade', '6:18', 2),
  ('Ophelia', 'Snowflake', '5:53', 3),
  ('Ophelia', 'Pale', '8:04', 4),
  ('Ophelia', 'Silence', '6:27', 5),
  ('Ophelia', 'Void', '7:11', 6),
  ('Ophelia', 'Winter', '5:39', 7),
  ('Ophelia', 'Still', '9:02', 8)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Lycia';

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Spleen et Ideal', 'De Profundis (Out of the Depths of Sorrow)', '6:55', 1),
  ('Spleen et Ideal', 'Ascension', '5:12', 2),
  ('Spleen et Ideal', 'Circassian', '4:47', 3),
  ('Spleen et Ideal', 'In Power We Entrust the Love Advocated', '4:02', 4),
  ('Spleen et Ideal', 'The Cardinal Sin', '3:29', 5),
  ('Spleen et Ideal', 'Mesmerism', '5:38', 6),
  ('Spleen et Ideal', 'Advent', '4:53', 7),
  ('Spleen et Ideal', 'Avatar', '6:17', 8),
  ('Spleen et Ideal', 'Indoctrination', '4:44', 9)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Dead Can Dance';
