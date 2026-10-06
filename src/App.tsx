import React, { useState, useEffect } from 'react';
import { KidsHUD } from './components/kids/KidsHUD';
import { KidsMenu } from './components/kids/KidsMenu';
import { KidsPotionLab } from './components/kids/KidsPotionLab';
import { KidsDetectiveGame } from './components/kids/KidsDetectiveGame';
import { KidsMatchGame } from './components/kids/KidsMatchGame';
import { KidsTrophyRoom } from './components/kids/KidsTrophyRoom';
import { soundManager } from './utils/audio';

const STORAGE_STARS_KEY = 'imbuhmaker_kids_stars_v1';

export default function App() {
  const [screen, setScreen] = useState<string>('menu'); // 'menu' | 'makmal' | 'detektif' | 'padan' | 'trofi'
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STARS_KEY);
      return saved ? parseInt(saved, 10) : 5; // Start with 5 welcome stars!
    } catch {
      return 5;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.getMuted());

  useEffect(() => {
    soundManager.setMuted(isMuted);
  }, [isMuted]);

  const handleEarnStar = () => {
    setStars((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(STORAGE_STARS_KEY, next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleResetStars = () => {
    setStars(0);
    try {
      localStorage.setItem(STORAGE_STARS_KEY, '0');
    } catch {
      // ignore
    }
  };

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-[#0B232A] text-white select-none">
      {/* Friendly Top HUD */}
      <KidsHUD
        currentScreen={screen}
        onGoHome={() => setScreen('menu')}
        stars={stars}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Single-Viewport Stage (Zero Scroll & Zero Clipping) */}
      <main className="flex-1 min-h-0 overflow-hidden relative p-1.5 sm:p-2.5 flex flex-col">
        {screen === 'menu' && (
          <KidsMenu
            onSelectGame={(gameId) => setScreen(gameId)}
            stars={stars}
          />
        )}

        {screen === 'makmal' && (
          <KidsPotionLab
            onEarnStar={handleEarnStar}
            onBackToMenu={() => setScreen('menu')}
          />
        )}

        {screen === 'detektif' && (
          <KidsDetectiveGame
            onEarnStar={handleEarnStar}
            onBackToMenu={() => setScreen('menu')}
          />
        )}

        {screen === 'padan' && (
          <KidsMatchGame
            onEarnStar={handleEarnStar}
            onBackToMenu={() => setScreen('menu')}
          />
        )}

        {screen === 'trofi' && (
          <KidsTrophyRoom
            stars={stars}
            onReset={handleResetStars}
            onBackToMenu={() => setScreen('menu')}
          />
        )}
      </main>
    </div>
  );
}
