import Icon from "@/components/ui/icon";

type Page = "home" | "albums";

const FEATURED_ALBUMS = [
  {
    id: 1,
    title: "Chromatic Void",
    artist: "Neon Architects",
    genre: "Electronic",
    year: 2024,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/9aeecbde-f588-471f-9fc1-c5e6012a8c11.jpg",
    color: "from-purple-900/60 to-transparent",
  },
  {
    id: 2,
    title: "Surge Protocol",
    artist: "Static Waves",
    genre: "Synthwave",
    year: 2024,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/7996eb2b-3b65-49cc-acf2-5ef0b5974e14.jpg",
    color: "from-cyan-900/60 to-transparent",
  },
  {
    id: 3,
    title: "Amber Sessions",
    artist: "Miles Echoes",
    genre: "Jazz",
    year: 2023,
    cover: "https://cdn.poehali.dev/projects/b6d26f0e-3a2b-4676-928d-3cecb0649a84/files/4e1000a7-d0c7-4fcd-ba1f-326fc7755c63.jpg",
    color: "from-amber-900/60 to-transparent",
  },
];

const GENRES = ["Electronic", "Synthwave", "Jazz", "Ambient", "Hip-Hop", "Rock"];

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
          <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
          <div className="absolute top-40 right-60 w-1 h-1 rounded-full bg-accent/60 animate-pulse delay-300" />
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-500" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
              <span className="inline-flex items-center gap-2 text-accent text-xs font-medium tracking-[0.2em] uppercase border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Новые релизы 2024
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-wide">
                <span className="text-white">СЛУШАЙ</span>
                <br />
                <span className="neon-text-purple">ПО-</span>
                <br />
                <span className="text-white/30">ДРУГОМУ</span>
              </h1>
            </div>

            <p className="text-white/50 text-lg font-light leading-relaxed opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
              Откройте для себя альбомы, которые меняют восприятие звука.
              Музыка, отобранная для тех, кто ценит каждую ноту.
            </p>

            <div className="flex items-center gap-4 opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
              <button
                onClick={() => onNavigate("albums")}
                className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-medium px-8 py-3.5 rounded-full transition-all hover:shadow-[0_0_24px_hsla(270,80%,65%,0.4)] active:scale-95"
              >
                <Icon name="Disc3" size={18} />
                Все альбомы
              </button>
              <button className="flex items-center gap-2 text-white/60 hover:text-white font-medium px-6 py-3.5 rounded-full border border-white/10 hover:border-white/20 transition-all">
                <Icon name="Play" size={16} />
                Слушать сейчас
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
              {[["2.4K", "Альбомов"], ["180+", "Жанров"], ["50K", "Слушателей"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-heading text-2xl font-bold text-white">{num}</div>
                  <div className="text-white/35 text-xs tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero визуализация */}
          <div className="relative hidden md:block opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 border border-white/5 overflow-hidden">
                <img
                  src={FEATURED_ALBUMS[0].cover}
                  alt="Featured"
                  className="w-full h-full object-cover opacity-70 animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-4 -left-8 glass rounded-2xl p-4 neon-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img src={FEATURED_ALBUMS[0].cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{FEATURED_ALBUMS[0].title}</div>
                    <div className="text-white/40 text-xs">{FEATURED_ALBUMS[0].artist}</div>
                  </div>
                  <div className="ml-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
                    <Icon name="Play" size={12} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 border border-white/5">
                <div className="text-center">
                  <div className="neon-text-cyan font-heading text-xl font-bold">#1</div>
                  <div className="text-white/40 text-[10px] tracking-wide">ТРЕНД</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Жанры */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-white/30 text-xs tracking-widest uppercase shrink-0 mr-2">Жанры</span>
            {GENRES.map((genre) => (
              <button
                key={genre}
                className="genre-pill shrink-0 text-white/50 border border-white/10 text-xs font-medium px-5 py-2 rounded-full"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Рекомендованные */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Рекомендуем</p>
              <h2 className="font-heading text-4xl font-bold text-white">ГОРЯЧИЕ РЕЛИЗЫ</h2>
            </div>
            <button
              onClick={() => onNavigate("albums")}
              className="text-white/40 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              Все альбомы
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_ALBUMS.map((album, i) => (
              <div
                key={album.id}
                className="album-card group relative rounded-2xl overflow-hidden cursor-pointer opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="album-img w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
                <div className={`album-overlay absolute inset-0 bg-gradient-to-t ${album.color} opacity-0 transition-opacity duration-300 flex items-end p-5`}>
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <div className="text-white font-heading text-lg font-semibold">{album.title}</div>
                      <div className="text-white/60 text-sm">{album.artist}</div>
                    </div>
                    <button className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Icon name="Play" size={16} className="text-white ml-0.5" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium tracking-wide text-white/70 border border-white/15 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {album.genre}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden neon-border p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <Icon name="Headphones" size={48} className="text-primary mx-auto mb-6 opacity-80" />
              <h2 className="font-heading text-5xl font-bold text-white mb-4">ГОТОВ ОТКРЫТЬ<br/>НОВУЮ МУЗЫКУ?</h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto">
                Тысячи альбомов по всем жанрам — от классики до самых смелых экспериментов
              </p>
              <button
                onClick={() => onNavigate("albums")}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-medium px-10 py-4 rounded-full transition-all hover:shadow-[0_0_30px_hsla(270,80%,65%,0.4)]"
              >
                <Icon name="Disc3" size={18} />
                Смотреть все альбомы
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
