import { useState, useEffect } from 'react';
import { MainMenu } from './components/MainMenu';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { CyberSnake } from './components/games/CyberSnake';
import { GlassBlocks } from './components/games/GlassBlocks';
import { NeonDuel } from './components/games/NeonDuel';
import { CosmicArkanoid } from './components/games/CosmicArkanoid';
import { SkyGlide } from './components/games/SkyGlide';
import { PixelGalaxy } from './components/games/PixelGalaxy';
import { NeonMaze } from './components/games/NeonMaze';
import { SoftSky } from './components/games/SoftSky';
import { Neo2048 } from './components/games/Neo2048';
import { NatureCrossing } from './components/games/NatureCrossing';
import { CubeArena } from './components/games/CubeArena';
import { NeonRush } from './components/games/NeonRush';
import { HoloGrid } from './components/games/HoloGrid';
import { RetroPinball } from './components/games/RetroPinball';
import { BrickGameMix } from './components/games/BrickGameMix';
import { AstroBlaster } from './components/games/AstroBlaster';

export type GameType = 
  | 'menu'
  | 'cyber-snake'
  | 'glass-blocks'
  | 'neon-duel'
  | 'cosmic-arkanoid'
  | 'sky-glide'
  | 'pixel-galaxy'
  | 'neon-maze'
  | 'soft-sky'
  | 'neo-2048'
  | 'nature-crossing'
  | 'cube-arena'
  | 'neon-rush'
  | 'holo-grid'
  | 'retro-pinball'
  | 'brick-game-mix'
  | 'astro-blaster';

export interface UserProfile {
  nickname: string;
  nicknameColor: string;
  backgroundImage: string | null;
  avatar: string | null;
  level: number;
  xp: number;
  coins: number;
}

export interface GameSettings {
  brightness: number;
  volume: number;
  language: string;
  soundEffects: boolean;
  music: boolean;
  particles: boolean;
  vibration: boolean;
}

export default function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: 'CyberPlayer',
    nicknameColor: '#00ff88',
    backgroundImage: null,
    avatar: null,
    level: 42,
    xp: 8750,
    coins: 15420,
  });

  const [settings, setSettings] = useState<GameSettings>({
    brightness: 80,
    volume: 70,
    language: 'ru',
    soundEffects: true,
    music: true,
    particles: true,
    vibration: true,
  });

  // Apply brightness setting
  useEffect(() => {
    document.documentElement.style.setProperty('--brightness', `${settings.brightness}%`);
  }, [settings.brightness]);

  const handleBackToMenu = () => {
    setCurrentGame('menu');
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'cyber-snake':
        return <CyberSnake onBack={handleBackToMenu} settings={settings} />;
      case 'glass-blocks':
        return <GlassBlocks onBack={handleBackToMenu} settings={settings} />;
      case 'neon-duel':
        return <NeonDuel onBack={handleBackToMenu} settings={settings} />;
      case 'cosmic-arkanoid':
        return <CosmicArkanoid onBack={handleBackToMenu} settings={settings} />;
      case 'sky-glide':
        return <SkyGlide onBack={handleBackToMenu} settings={settings} />;
      case 'pixel-galaxy':
        return <PixelGalaxy onBack={handleBackToMenu} settings={settings} />;
      case 'neon-maze':
        return <NeonMaze onBack={handleBackToMenu} settings={settings} />;
      case 'soft-sky':
        return <SoftSky onBack={handleBackToMenu} settings={settings} />;
      case 'neo-2048':
        return <Neo2048 onBack={handleBackToMenu} settings={settings} />;
      case 'nature-crossing':
        return <NatureCrossing onBack={handleBackToMenu} settings={settings} />;
      case 'cube-arena':
        return <CubeArena onBack={handleBackToMenu} settings={settings} />;
      case 'neon-rush':
        return <NeonRush onBack={handleBackToMenu} settings={settings} />;
      case 'holo-grid':
        return <HoloGrid onBack={handleBackToMenu} settings={settings} />;
      case 'retro-pinball':
        return <RetroPinball onBack={handleBackToMenu} settings={settings} />;
      case 'brick-game-mix':
        return <BrickGameMix onBack={handleBackToMenu} settings={settings} />;
      case 'astro-blaster':
        return <AstroBlaster onBack={handleBackToMenu} settings={settings} />;
      default:
        return (
          <MainMenu
            onSelectGame={setCurrentGame}
            onOpenProfile={() => setShowProfile(true)}
            onOpenSettings={() => setShowSettings(true)}
            userProfile={userProfile}
          />
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-950 via-black to-blue-950 overflow-hidden">
      {/* Animated background particles */}
      {settings.particles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ top: '10%', left: '20%', boxShadow: '0 0 10px #06b6d4' }} />
          <div className="absolute w-1 h-1 bg-pink-500 rounded-full animate-pulse" style={{ top: '60%', left: '80%', boxShadow: '0 0 10px #ec4899', animationDelay: '1s' }} />
          <div className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ top: '80%', left: '30%', boxShadow: '0 0 10px #eab308', animationDelay: '2s' }} />
          <div className="absolute w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ top: '30%', left: '70%', boxShadow: '0 0 10px #22c55e', animationDelay: '0.5s' }} />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10" style={{ filter: `brightness(var(--brightness, 100%))` }}>
        {renderGame()}
      </div>

      {/* Profile modal */}
      {showProfile && (
        <Profile
          profile={userProfile}
          onClose={() => setShowProfile(false)}
          onUpdateProfile={setUserProfile}
        />
      )}

      {/* Settings modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onClose={() => setShowSettings(false)}
          onUpdateSettings={setSettings}
        />
      )}
    </div>
  );
}
