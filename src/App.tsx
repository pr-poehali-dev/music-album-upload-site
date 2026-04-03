import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import Icon from "@/components/ui/icon";

type Page = "home" | "albums";

const App = () => {
  const [activePage, setActivePage] = useState<Page>("home");

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background font-body">
        <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-pulse-glow">
                <Icon name="Music2" size={16} className="text-primary" />
              </div>
              <span className="font-heading text-xl font-semibold tracking-widest text-white">
                SOUND<span className="neon-text-cyan">WAVE</span>
              </span>
            </div>

            <div className="flex items-center gap-8">
              <button
                onClick={() => setActivePage("home")}
                className={`nav-link font-body text-sm font-medium tracking-wide transition-colors ${
                  activePage === "home"
                    ? "text-white active"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActivePage("albums")}
                className={`nav-link font-body text-sm font-medium tracking-wide transition-colors ${
                  activePage === "albums"
                    ? "text-white active"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Альбомы
              </button>
            </div>

            <button className="hidden md:flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-medium px-4 py-2 rounded-full transition-all hover:shadow-[0_0_12px_hsla(270,80%,65%,0.3)]">
              <Icon name="Search" size={14} />
              Поиск
            </button>
          </div>
        </nav>

        <main className="pt-16">
          {activePage === "home" && <HomePage onNavigate={setActivePage} />}
          {activePage === "albums" && <AlbumsPage />}
        </main>

        <footer className="border-t border-white/5 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-heading text-sm tracking-widest text-white/30">
              SOUND<span className="text-white/50">WAVE</span>
            </span>
            <p className="text-white/25 text-xs font-light">
              Музыка для тех, кто слышит больше
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default App;
