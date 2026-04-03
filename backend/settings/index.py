"""
API для настроек сайта: получение и обновление текстов главной страницы.
GET /  — получить все настройки
POST / — обновить настройки (передать объект key:value)
"""

import json
import os
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p67244302_music_album_upload_s")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

ALLOWED_KEYS = {
    "hero_title_line1", "hero_title_line2", "hero_title_line3",
    "hero_subtitle", "hero_badge", "cta_title", "cta_subtitle"
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        return get_settings()
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        return update_settings(body)

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}


def get_settings():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"SELECT key, value FROM {SCHEMA}.site_settings")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({r[0]: r[1] for r in rows})}


def update_settings(data: dict):
    conn = get_conn()
    cur = conn.cursor()
    for key, value in data.items():
        if key not in ALLOWED_KEYS:
            continue
        cur.execute(
            f"UPDATE {SCHEMA}.site_settings SET value = %s, updated_at = NOW() WHERE key = %s",
            (str(value), key)
        )
    conn.commit()
    cur.close()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
