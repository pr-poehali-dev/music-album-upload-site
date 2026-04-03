import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const ALBUMS_URL = "https://functions.poehali.dev/ce59cbd1-540a-49c7-a8da-cb03288d76f1";

const GENRES_FILTER = ["Все", "Gothic"];
const GENRES_FORM = ["Gothic"];

const PLACEHOLDER_COVERS = [
  "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/9aeecbde-f588-471f-9fc1-c5e6012a8c11.jpg",
  "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/7996eb2b-3b65-49cc-acf2-5ef0b5974e14.jpg",
  "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/4e1000a7-d0c7-4fcd-ba1f-326fc7755c63.jpg",
];

const INITIAL_ALBUMS: Album[] = [
  { id: -1, title: "Chromatic Void", artist: "Neon Architects", genre: "Electronic", year: 2024, tracks: 12, cover_url: PLACEHOLDER_COVERS[0] },
  { id: -2, title: "Surge Protocol", artist: "Static Waves", genre: "Synthwave", year: 2024, tracks: 9, cover_url: PLACEHOLDER_COVERS[1] },
  { id: -3, title: "Amber Sessions", artist: "Miles Echoes", genre: "Jazz", year: 2023, tracks: 8, cover_url: PLACEHOLDER_COVERS[2] },
  { id: -4, title: "Digital Rain", artist: "Pulse Engine", genre: "Electronic", year: 2024, tracks: 11, cover_url: PLACEHOLDER_COVERS[0] },
  { id: -5, title: "Night Drive 2049", artist: "ChromaSet", genre: "Synthwave", year: 2023, tracks: 10, cover_url: PLACEHOLDER_COVERS[1] },
  { id: -6, title: "Smoke & Brass", artist: "The Quartet", genre: "Jazz", year: 2024, tracks: 7, cover_url: PLACEHOLDER_COVERS[2] },
];

interface Album {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: number;
  tracks: number;
  cover_url: string | null;
}

interface Track {
  id: number;
  title: string;
  duration: string | null;
  position: number;
}

const EMPTY_FORM = { title: "", artist: "", genre: "Electronic", year: new Date().getFullYear(), tracks: 0 };

export default function AlbumsPage() {
  const [activeGenre, setActiveGenre] = useState("Все");
  const [search, setSearch] = useState("");
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);

  // Форма добавления альбома
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const [errorAlbum, setErrorAlbum] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Модалка альбома с треклистом
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [trackForm, setTrackForm] = useState({ title: "", duration: "" });
  const [addingTrack, setAddingTrack] = useState(false);
  const [errorTrack, setErrorTrack] = useState("");

  useEffect(() => {
    fetch(ALBUMS_URL)
      .then((r) => r.json())
      .then((data) => { if (data.albums?.length > 0) setAlbums(data.albums); })
      .catch(() => {});
  }, []);

  const filtered = albums.filter((a) => {
    const matchGenre = activeGenre === "Все" || a.genre === activeGenre;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmitAlbum(e: React.FormEvent) {
    e.preventDefault();
    setErrorAlbum("");
    if (!form.title || !form.artist || !form.genre) { setErrorAlbum("Заполните все поля"); return; }
    setLoadingAlbum(true);

    let cover_data: string | null = null;
    let cover_mime: string | null = null;
    if (coverFile) {
      const buf = await coverFile.arrayBuffer();
      cover_data = btoa(String.fromCharCode(...new Uint8Array(buf)));
      cover_mime = coverFile.type;
    }

    const res = await fetch(ALBUMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cover_data, cover_mime }),
    });
    const data = await res.json();
    if (!res.ok) { setErrorAlbum(data.error || "Ошибка"); setLoadingAlbum(false); return; }

    setAlbums((prev) => [{ id: data.id, ...form, cover_url: data.cover_url || null }, ...prev]);
    setForm(EMPTY_FORM); setCoverFile(null); setCoverPreview(null); setShowForm(false); setLoadingAlbum(false);
  }

  async function openAlbum(album: Album) {
    setSelectedAlbum(album);
    setTracks([]);
    setTrackForm({ title: "", duration: "" });
    setErrorTrack("");
    if (album.id > 0) {
      setLoadingTracks(true);
      const res = await fetch(`${ALBUMS_URL}?album_id=${album.id}`);
      const data = await res.json();
      setTracks(data.tracks || []);
      setLoadingTracks(false);
    }
  }

  async function handleAddTrack(e: React.FormEvent) {
    e.preventDefault();
    setErrorTrack("");
    if (!trackForm.title.trim()) { setErrorTrack("Введите название трека"); return; }
    setAddingTrack(true);

    const res = await fetch(`${ALBUMS_URL}/tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ album_id: selectedAlbum!.id, title: trackForm.title, duration: trackForm.duration || null }),
    });
    const data = await res.json();
    if (!res.ok) { setErrorTrack(data.error || "Ошибка"); setAddingTrack(false); return; }

    const newTrack: Track = { id: data.id, title: trackForm.title, duration: trackForm.duration || null, position: data.position };
    setTracks((prev) => [...prev, newTrack]);
    setAlbums((prev) => prev.map((a) => a.id === selectedAlbum!.id ? { ...a, tracks: a.tracks + 1 } : a));
    setSelectedAlbum((prev) => prev ? { ...prev, tracks: prev.tracks + 1 } : prev);
    setTrackForm({ title: "", duration: "" });
    setAddingTrack(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Заголовок */}
      <div className="flex items-end justify-between mb-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
        <div>
          <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Каталог</p>
          <h1 className="font-heading text-5xl font-bold text-white mb-2">ВСЕ АЛЬБОМЫ</h1>
          <p className="text-white/35 text-sm">{albums.length} альбомов в коллекции</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-medium px-6 py-3 rounded-full transition-all hover:shadow-[0_0_20px_hsla(270,80%,65%,0.4)] active:scale-95"
        >
          <Icon name="Plus" size={16} />
          Добавить альбом
        </button>
      </div>

      {/* Поиск + фильтры */}
      <div className="space-y-4 mb-10 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: "forwards" }}>
        <div className="relative max-w-md">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Найти альбом или артиста..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 pl-10 pr-4 py-3 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {GENRES_FILTER.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`genre-pill text-xs font-medium px-5 py-2 rounded-full border transition-all ${
                activeGenre === g
                  ? "bg-primary text-white border-primary shadow-[0_0_12px_hsla(270,80%,65%,0.4)]"
                  : "text-white/50 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((album, i) => {
            const cover = album.cover_url || PLACEHOLDER_COVERS[i % 3];
            return (
              <div
                key={album.id}
                className="album-card group cursor-pointer opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "forwards" }}
                onClick={() => openAlbum(album)}
              >
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                  <img src={cover} alt={album.title} className="album-img w-full h-full object-cover transition-transform duration-500" />
                  <div className="album-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_hsla(270,80%,65%,0.5)]">
                      <Icon name="ListMusic" size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/60 border border-white/15 bg-black/30 px-2 py-0.5 rounded-full">{album.genre}</span>
                      {album.tracks > 0 && <span className="text-[10px] text-white/40">{album.tracks} тр.</span>}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm leading-tight truncate">{album.title}</h3>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-white/40 text-xs truncate">{album.artist}</p>
                    <p className="text-white/25 text-xs shrink-0 ml-2">{album.year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24">
          <Icon name="SearchX" size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/30 font-heading text-xl">Ничего не найдено</p>
          <p className="text-white/20 text-sm mt-1">Попробуйте другой жанр или запрос</p>
        </div>
      )}

      {/* Модалка: альбом + треки */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelectedAlbum(null)} />
          <div className="relative glass neon-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            {/* Шапка альбома */}
            <div className="relative h-40 overflow-hidden rounded-t-2xl">
              <img
                src={selectedAlbum.cover_url || PLACEHOLDER_COVERS[0]}
                alt={selectedAlbum.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors bg-black/30 rounded-full p-1.5"
              >
                <Icon name="X" size={18} />
              </button>
              <div className="absolute bottom-4 left-5">
                <h2 className="font-heading text-2xl font-bold text-white">{selectedAlbum.title}</h2>
                <p className="text-white/50 text-sm">{selectedAlbum.artist} · {selectedAlbum.genre} · {selectedAlbum.year}</p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Треклист */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-accent text-xs tracking-[0.15em] uppercase font-medium">
                    Треклист · {selectedAlbum.tracks} треков
                  </p>
                </div>

                {loadingTracks ? (
                  <div className="flex items-center gap-2 text-white/30 py-4">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="text-sm">Загружаю...</span>
                  </div>
                ) : tracks.length > 0 ? (
                  <div className="space-y-1">
                    {tracks.map((track) => (
                      <div key={track.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group/track">
                        <span className="text-white/20 text-xs w-5 text-right shrink-0">{track.position}</span>
                        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/track:bg-primary/20 group-hover/track:border-primary/30 transition-colors cursor-pointer">
                          <Icon name="Play" size={10} className="text-white/40 group-hover/track:text-primary ml-0.5" />
                        </div>
                        <span className="text-white/80 text-sm flex-1 truncate">{track.title}</span>
                        {track.duration && (
                          <span className="text-white/30 text-xs shrink-0">{track.duration}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/25 text-sm py-2">Треков ещё нет — добавьте первый</p>
                )}
              </div>

              {/* Форма добавления трека */}
              {selectedAlbum.id > 0 && (
                <form onSubmit={handleAddTrack} className="border-t border-white/8 pt-4 space-y-3">
                  <p className="text-white/50 text-xs tracking-wide uppercase">Добавить трек</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Название трека *"
                      value={trackForm.title}
                      onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/25 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="3:45"
                      value={trackForm.duration}
                      onChange={(e) => setTrackForm({ ...trackForm, duration: e.target.value })}
                      className="w-20 bg-white/5 border border-white/10 text-white placeholder:text-white/25 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all text-center"
                    />
                  </div>
                  {errorTrack && <p className="text-red-400 text-xs">{errorTrack}</p>}
                  <button
                    type="submit"
                    disabled={addingTrack}
                    className="w-full flex items-center justify-center gap-2 bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary font-medium py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
                  >
                    {addingTrack
                      ? <><Icon name="Loader2" size={14} className="animate-spin" /> Добавляю...</>
                      : <><Icon name="Plus" size={14} /> Добавить трек</>
                    }
                  </button>
                </form>
              )}

              {selectedAlbum.id < 0 && (
                <p className="text-white/25 text-xs text-center pt-2 border-t border-white/8">
                  Это демо-альбом — добавьте настоящий через кнопку «Добавить альбом»
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Модалка добавления альбома */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative glass neon-border rounded-2xl w-full max-w-md p-6 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-white">НОВЫЙ АЛЬБОМ</h2>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitAlbum} className="space-y-4">
              <div
                onClick={() => fileRef.current?.click()}
                className="relative aspect-video rounded-xl border-2 border-dashed border-white/15 hover:border-primary/40 transition-colors cursor-pointer overflow-hidden flex items-center justify-center bg-white/3"
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Icon name="ImagePlus" size={32} className="text-white/20 mx-auto mb-2" />
                    <p className="text-white/30 text-xs">Нажмите чтобы загрузить обложку</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>

              <input
                type="text"
                placeholder="Название альбома *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
              <input
                type="text"
                placeholder="Артист *"
                value={form.artist}
                onChange={(e) => setForm({ ...form, artist: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                >
                  {GENRES_FORM.map((g) => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Год"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>

              {errorAlbum && <p className="text-red-400 text-xs">{errorAlbum}</p>}

              <button
                type="submit"
                disabled={loadingAlbum}
                className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all hover:shadow-[0_0_20px_hsla(270,80%,65%,0.4)] flex items-center justify-center gap-2"
              >
                {loadingAlbum ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Upload" size={16} />}
                {loadingAlbum ? "Загружаю..." : "Добавить альбом"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}