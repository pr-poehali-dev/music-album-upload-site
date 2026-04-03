import { useState } from "react";
import Icon from "@/components/ui/icon";

const GENRES = ["Все", "Electronic", "Synthwave", "Jazz", "Ambient", "Hip-Hop", "Rock", "Classical"];

const ALBUMS = [
  {
    id: 1,
    title: "Chromatic Void",
    artist: "Neon Architects",
    genre: "Electronic",
    year: 2024,
    tracks: 12,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/9aeecbde-f588-471f-9fc1-c5e6012a8c11.jpg",
  },
  {
    id: 2,
    title: "Surge Protocol",
    artist: "Static Waves",
    genre: "Synthwave",
    year: 2024,
    tracks: 9,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/7996eb2b-3b65-49cc-acf2-5ef0b5974e14.jpg",
  },
  {
    id: 3,
    title: "Amber Sessions",
    artist: "Miles Echoes",
    genre: "Jazz",
    year: 2023,
    tracks: 8,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/4e1000a7-d0c7-4fcd-ba1f-326fc7755c63.jpg",
  },
  {
    id: 4,
    title: "Digital Rain",
    artist: "Pulse Engine",
    genre: "Electronic",
    year: 2024,
    tracks: 11,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/9aeecbde-f588-471f-9fc1-c5e6012a8c11.jpg",
  },
  {
    id: 5,
    title: "Night Drive 2049",
    artist: "ChromaSet",
    genre: "Synthwave",
    year: 2023,
    tracks: 10,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/7996eb2b-3b65-49cc-acf2-5ef0b5974e14.jpg",
  },
  {
    id: 6,
    title: "Smoke & Brass",
    artist: "The Quartet",
    genre: "Jazz",
    year: 2024,
    tracks: 7,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/4e1000a7-d0c7-4fcd-ba1f-326fc7755c63.jpg",
  },
];

export default function AlbumsPage() {
  const [activeGenre, setActiveGenre] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = ALBUMS.filter((a) => {
    const matchGenre = activeGenre === "Все" || a.genre === activeGenre;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Заголовок */}
      <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
        <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Каталог</p>
        <h1 className="font-heading text-5xl font-bold text-white mb-2">ВСЕ АЛЬБОМЫ</h1>
        <p className="text-white/35 text-sm">{ALBUMS.length} альбомов в коллекции</p>
      </div>

      {/* Поиск + фильтры */}
      <div className="space-y-4 mb-10 opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: 'forwards' }}>
        <div className="relative max-w-md">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Найти альбом или артиста..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 pl-10 pr-4 py-3 rounded-full text-sm focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {GENRES.map((g) => (
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

      {/* Сетка альбомов */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((album, i) => (
            <div
              key={album.id}
              className="album-card group cursor-pointer opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.07}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative rounded-xl overflow-hidden mb-3 aspect-square">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="album-img w-full h-full object-cover transition-transform duration-500"
                />
                <div className="album-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors shadow-[0_0_20px_hsla(270,80%,65%,0.5)]">
                    <Icon name="Play" size={18} className="text-white ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/60 border border-white/15 bg-black/30 px-2 py-0.5 rounded-full">
                      {album.genre}
                    </span>
                    <span className="text-[10px] text-white/40">{album.tracks} тр.</span>
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
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Icon name="SearchX" size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/30 font-heading text-xl">Ничего не найдено</p>
          <p className="text-white/20 text-sm mt-1">Попробуйте другой жанр или запрос</p>
        </div>
      )}
    </div>
  );
}
