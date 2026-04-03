INSERT INTO t_p67244302_music_album_upload_s.albums (title, artist, genre, year, tracks, cover_url) VALUES
(
  'Pornography',
  'The Sisters of Mercy',
  'Gothic',
  1992,
  10,
  'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/ea843452-eeb1-49f2-9ab7-adff33183ae3.jpg'
),
(
  'Floodland',
  'The Sisters of Mercy',
  'Gothic',
  1987,
  9,
  'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/1cd42fcc-9825-4df8-a852-0f1b7cd8fa07.jpg'
),
(
  'In the Flat Field',
  'Bauhaus',
  'Gothic',
  1980,
  9,
  'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/3c26a04e-8c47-40d5-98c5-f98262ca326e.jpg'
),
(
  'Mask',
  'Bauhaus',
  'Gothic',
  1981,
  10,
  'https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/42a26fbc-aae6-4368-b354-d51aa1f0d1cf.jpg'
);

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Pornography', 'One Hundred Years', '6:27', 1),
  ('Pornography', 'A Short Term Effect', '4:12', 2),
  ('Pornography', 'The Hanging Garden', '4:49', 3),
  ('Pornography', 'Siamese Twins', '5:45', 4),
  ('Pornography', 'The Figurehead', '6:14', 5),
  ('Pornography', 'A Strange Day', '5:04', 6),
  ('Pornography', 'Cold', '4:15', 7),
  ('Pornography', 'Pornography', '6:28', 8),
  ('Pornography', 'Happy the Man', '2:44', 9),
  ('Pornography', 'Forever', '3:38', 10)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'The Sisters of Mercy' AND a.year = 1992;

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Floodland', 'Dominion / Mother Russia', '6:56', 1),
  ('Floodland', 'Flood I', '5:06', 2),
  ('Floodland', 'Lucretia My Reflection', '5:30', 3),
  ('Floodland', 'Too Late', '0:39', 4),
  ('Floodland', 'Torch', '5:33', 5),
  ('Floodland', 'Flood II', '5:39', 6),
  ('Floodland', 'Driven Like the Snow', '5:01', 7),
  ('Floodland', 'Never Land', '5:30', 8),
  ('Floodland', 'Neverland', '7:05', 9)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'The Sisters of Mercy' AND a.year = 1987;

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('In the Flat Field', 'Double Dare', '4:30', 1),
  ('In the Flat Field', 'In the Flat Field', '4:42', 2),
  ('In the Flat Field', 'A God in an Alcove', '4:25', 3),
  ('In the Flat Field', 'Dive', '3:42', 4),
  ('In the Flat Field', 'Spy in the Cab', '4:31', 5),
  ('In the Flat Field', 'Small Talk Stinks', '3:49', 6),
  ('In the Flat Field', 'St. Vitus Dance', '2:57', 7),
  ('In the Flat Field', 'Stigmata Martyr', '4:22', 8),
  ('In the Flat Field', 'Nerves', '3:10', 9)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Bauhaus' AND a.year = 1980;

INSERT INTO t_p67244302_music_album_upload_s.tracks (album_id, title, duration, position)
SELECT a.id, t.title, t.duration, t.position
FROM t_p67244302_music_album_upload_s.albums a
JOIN (VALUES
  ('Mask', 'Hair of the Dog', '4:13', 1),
  ('Mask', 'The Passion of Lovers', '4:38', 2),
  ('Mask', 'Of Lillies and Remains', '2:48', 3),
  ('Mask', 'Dancing', '5:03', 4),
  ('Mask', 'Hollow Hills', '4:33', 5),
  ('Mask', 'Kick in the Eye', '4:39', 6),
  ('Mask', 'In Fear of Fear', '4:52', 7),
  ('Mask', 'Muscle in Plastic', '3:41', 8),
  ('Mask', 'Earwax', '1:36', 9),
  ('Mask', 'Mask', '5:07', 10)
) AS t(album_title, title, duration, position) ON a.title = t.album_title AND a.artist = 'Bauhaus' AND a.year = 1981;
