CREATE TABLE t_p67244302_music_album_upload_s.tracks (
    id SERIAL PRIMARY KEY,
    album_id INTEGER NOT NULL REFERENCES t_p67244302_music_album_upload_s.albums(id),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(20),
    position INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);
