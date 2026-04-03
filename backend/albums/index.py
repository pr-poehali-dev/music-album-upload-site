"""
API для управления альбомами: получение списка и загрузка нового альбома с обложкой в S3.
"""

import json
import os
import base64
import uuid
import psycopg2
import boto3


SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p67244302_music_album_upload_s")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        return get_albums()
    elif method == "POST":
        body = json.loads(event.get("body") or "{}")
        return create_album(body)

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}


def get_albums():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, title, artist, genre, year, tracks, cover_url, created_at FROM {SCHEMA}.albums ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    albums = [
        {
            "id": r[0],
            "title": r[1],
            "artist": r[2],
            "genre": r[3],
            "year": r[4],
            "tracks": r[5],
            "cover_url": r[6],
            "created_at": r[7].isoformat() if r[7] else None,
        }
        for r in rows
    ]

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"albums": albums})}


def create_album(body: dict):
    title = body.get("title", "").strip()
    artist = body.get("artist", "").strip()
    genre = body.get("genre", "").strip()
    year = int(body.get("year", 2024))
    tracks = int(body.get("tracks", 0))
    cover_data = body.get("cover_data")
    cover_mime = body.get("cover_mime", "image/jpeg")

    if not title or not artist or not genre:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все обязательные поля"})}

    cover_url = None

    if cover_data:
        s3 = boto3.client(
            "s3",
            endpoint_url="https://bucket.poehali.dev",
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        )
        ext = cover_mime.split("/")[-1] if "/" in cover_mime else "jpg"
        key = f"albums/{uuid.uuid4()}.{ext}"
        image_bytes = base64.b64decode(cover_data)
        s3.put_object(Bucket="files", Key=key, Body=image_bytes, ContentType=cover_mime)
        cover_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {SCHEMA}.albums (title, artist, genre, year, tracks, cover_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (title, artist, genre, year, tracks, cover_url),
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 201,
        "headers": CORS,
        "body": json.dumps({"id": new_id, "cover_url": cover_url, "message": "Альбом добавлен"}),
    }
