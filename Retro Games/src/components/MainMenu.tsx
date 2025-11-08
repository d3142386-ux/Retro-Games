import { motion } from 'motion/react';
import { GameCard } from './GameCard';
import { User, Settings, Trophy, Sparkles } from 'lucide-react';
import type { GameType, UserProfile } from '../App';

interface MainMenuProps {
  onSelectGame: (game: GameType) => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  userProfile: UserProfile;
}

export function MainMenu({ onSelectGame, onOpenProfile, onOpenSettings, userProfile }: MainMenuProps) {
  const games = [
    { id: 'cyber-snake', emoji: '🐍', title: 'Cyber Snake', description: 'Современная неоновая змейка', color: 'from-green-500 to-emerald-600' },
    { id: 'glass-blocks', emoji: '🧱', title: 'Glass Blocks', description: 'Тетрис со стеклянными блоками', color: 'from-blue-500 to-cyan-600' },
    { id: 'neon-duel', emoji: '🏓', title: 'Neon Duel', description: 'Неоновый пинг-понг', color: 'from-pink-500 to-purple-600' },
    { id: 'cosmic-arkanoid', emoji: '🚀', title: 'Cosmic Arkanoid', description: 'Арканоид с космической темой', color: 'from-indigo-500 to-blue-600' },
    { id: 'sky-glide', emoji: '🕊️', title: 'Sky Glide', description: 'Флаппи-птица с облаками и светом', color: 'from-sky-400 to-blue-500' },
    { id: 'pixel-galaxy', emoji: '👾', title: 'Pixel Galaxy', description: 'Космические захватчики', color: 'from-purple-500 to-pink-600' },
    { id: 'neon-maze', emoji: '🌀', title: 'Neon Maze', description: 'Неоновый лабиринт', color: 'from-yellow-500 to-orange-600' },
    { id: 'soft-sky', emoji: '☁️', title: 'Soft Sky', description: 'Вертикальный джампер', color: 'from-cyan-400 to-sky-500' },
    { id: 'neo-2048', emoji: '🔢', title: '2048 Neo', description: 'Современный числовой пазл', color: 'from-orange-500 to-red-600' },
    { id: 'nature-crossing', emoji: '🐸', title: 'Nature Crossing', description: 'Лягушка через дорогу и реку', color: 'from-green-600 to-teal-600' },
    { id: 'cube-arena', emoji: '💣', title: 'Cube Arena', description: 'Классическая бомбёжка на арене', color: 'from-red-500 to-orange-600' },
    { id: 'neon-rush', emoji: '🏃', title: 'Neon Rush', description: 'Бесконечный раннер', color: 'from-fuchsia-500 to-pink-600' },
    { id: 'holo-grid', emoji: '💣', title: 'Holo Grid', description: 'Современный сапёр', color: 'from-slate-500 to-gray-600' },
    { id: 'retro-pinball', emoji: '🧩', title: 'Retro Pinball', description: 'Неоновый пинбол', color: 'from-violet-500 to-purple-600' },
    { id: 'brick-game-mix', emoji: '🕹️', title: 'Brick Game Mix', description: 'Ретро-консоль с мини-играми', color: 'from-amber-500 to-yellow-600' },
    { id: 'astro-blaster', emoji: '🚀', title: 'Astro Blaster', description: 'Космический шутер сверху вниз', color: 'from-blue-600 to-indigo-700' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        {/* Profile button - Left */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenProfile}
          className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3 pr-6 shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <div className="relative">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Avatar" className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-black">
              <span className="text-xs">{userProfile.level}</span>
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span style={{ color: userProfile.nicknameColor }} className="drop-shadow-[0_0_8px_currentColor]">
                {userProfile.nickname}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span>{userProfile.coins} монет</span>
            </div>
          </div>
        </motion.button>

        {/* Title - Center */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            RETRO GAMES
          </h1>
          <p className="text-cyan-300/60 text-sm md:text-base mt-1">Выберите игру для начала</p>
        </motion.div>

        {/* Settings button - Right */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Settings className="w-6 h-6 text-purple-400" />
        </motion.button>
      </header>

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20"
      >
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            onSelect={() => onSelectGame(game.id as GameType)}
          />
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>🎮 Создано с любовью к ретро-играм • 2025</p>
      </footer>
    </div>
  );
}
