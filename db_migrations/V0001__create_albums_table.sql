CREATE TABLE t_p67244302_music_album_upload_s.albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    tracks INTEGER DEFAULT 0,
    cover_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
