import { motion } from 'motion/react';
import { ArrowLeft, Play, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface BrickGameMixProps {
  onBack: () => void;
  settings: GameSettings;
}

export function BrickGameMix({ onBack, settings }: BrickGameMixProps) {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const miniGames = [
    { id: 1, name: 'Race', icon: '🏎️', color: 'red' },
    { id: 2, name: 'Tank', icon: '🎯', color: 'green' },
    { id: 3, name: 'Snake', icon: '🐍', color: 'yellow' },
    { id: 4, name: 'Tetris', icon: '🧱', color: 'blue' },
    { id: 5, name: 'Shoot', icon: '🚀', color: 'purple' },
    { id: 6, name: 'Copter', icon: '🚁', color: 'cyan' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-amber-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            🕹️ Brick Game Mix
          </h1>
          <p className="text-amber-300/60 text-sm mt-1">Классические мини-игры!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[400px_1fr] gap-6">
          {/* Brick Console */}
          <div className="bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-800 rounded-3xl p-6 shadow-2xl border-4 border-yellow-900">
            {/* Screen */}
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-xl p-4 mb-6 border-4 border-green-950">
              <div className="bg-green-400/10 rounded-lg p-3 border-2 border-green-800" style={{ aspectRatio: '3/4' }}>
                {/* Pixel display */}
                <div className="grid grid-cols-10 gap-[2px] h-full">
                  {Array.from({ length: 200 }).map((_, i) => {
                    const row = Math.floor(i / 10);
                    const col = i % 10;
                    
                    // Show brick game logo pattern when no game selected
                    const isActive = selectedGame === null
                      ? (row === 5 && col >= 2 && col <= 7) ||
                        (row === 6 && (col === 2 || col === 7)) ||
                        (row === 7 && col >= 2 && col <= 7) ||
                        (row === 9 && col >= 3 && col <= 6) ||
                        (row === 10 && (col === 3 || col === 6)) ||
                        (row === 11 && col >= 3 && col <= 6)
                      : Math.random() > 0.7;

                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm transition-all ${
                          isActive
                            ? 'bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)]'
                            : 'bg-green-900/20'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Score display */}
                <div className="mt-2 flex items-center justify-between px-2">
                  <div className="text-green-400 text-xs font-mono">SCORE: 9999</div>
                  <div className="text-green-400 text-xs font-mono">LV: 15</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* D-Pad */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <button className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-900 shadow-lg hover:bg-gray-700 transition-all">
                    <span className="text-gray-400">▲</span>
                  </button>
                  <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-900 shadow-lg hover:bg-gray-700 transition-all">
                    <span className="text-gray-400">▼</span>
                  </button>
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-900 shadow-lg hover:bg-gray-700 transition-all">
                    <span className="text-gray-400">◀</span>
                  </button>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-900 shadow-lg hover:bg-gray-700 transition-all">
                    <span className="text-gray-400">▶</span>
                  </button>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-around">
                <button className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-red-900 shadow-lg hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center">
                  <span className="text-white text-xs">A</span>
                </button>
                <button className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-900 shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all flex items-center justify-center">
                  <span className="text-white text-xs">B</span>
                </button>
              </div>

              {/* Start/Select */}
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-2 bg-gray-800 rounded-full text-xs text-gray-400 border-2 border-gray-900 hover:bg-gray-700 transition-all">
                  SELECT
                </button>
                <button className="px-6 py-2 bg-gray-800 rounded-full text-xs text-gray-400 border-2 border-gray-900 hover:bg-gray-700 transition-all">
                  START
                </button>
              </div>
            </div>
          </div>

          {/* Game Selection */}
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6">
              <h2 className="text-2xl text-amber-400 mb-4 flex items-center gap-2">
                <Gamepad2 className="w-6 h-6" />
                Выберите игру
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {miniGames.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`p-6 rounded-xl transition-all ${
                      selectedGame === game.id
                        ? `bg-gradient-to-br from-${game.color}-500 to-${game.color}-700 border-2 border-${game.color}-400`
                        : 'bg-black/40 border-2 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-5xl mb-3">{game.icon}</div>
                    <div className={`text-lg ${
                      selectedGame === game.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      {game.name}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Game info */}
            {selectedGame && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6"
              >
                <h3 className="text-green-400 mb-3">Инструкции</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>• Используйте D-Pad для управления</p>
                  <p>• Кнопка A - основное действие</p>
                  <p>• Кнопка B - второстепенное действие</p>
                  <p>• START - начать/пауза</p>
                  <p>• SELECT - выбор режима</p>
                </div>
              </motion.div>
            )}

            {/* Best scores */}
            <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
              <h3 className="text-yellow-400 mb-4">Рекорды</h3>
              <div className="space-y-2">
                {miniGames.slice(0, 3).map((game, i) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3 bg-black/40 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{game.icon}</span>
                      <span className="text-white">{game.name}</span>
                    </div>
                    <span className="text-yellow-400">{9999 - i * 1000}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
