import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface Neo2048Props {
  onBack: () => void;
  settings: GameSettings;
}

export function Neo2048({ onBack, settings }: Neo2048Props) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(12840);

  const gridSize = 4;
  
  // Example game state
  const tiles = [
    [2, 0, 4, 0],
    [0, 8, 16, 2],
    [4, 32, 64, 8],
    [2, 0, 128, 16],
  ];

  const getTileColor = (value: number) => {
    const colors: Record<number, string> = {
      2: 'from-cyan-400 to-cyan-600',
      4: 'from-blue-400 to-blue-600',
      8: 'from-purple-400 to-purple-600',
      16: 'from-pink-400 to-pink-600',
      32: 'from-red-400 to-red-600',
      64: 'from-orange-400 to-orange-600',
      128: 'from-yellow-400 to-yellow-600',
      256: 'from-green-400 to-green-600',
      512: 'from-teal-400 to-teal-600',
      1024: 'from-indigo-400 to-indigo-600',
      2048: 'from-fuchsia-400 to-fuchsia-600',
    };
    return colors[value] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-orange-400" />
          <span className="text-orange-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            🔢 2048 Neo
          </h1>
          <p className="text-orange-300/60 text-sm mt-1">Соединяйте числа!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Score */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
            <div className="text-sm text-orange-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-orange-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1">Рекорд</div>
            <div className="text-3xl text-yellow-400">{bestScore}</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl p-4 shadow-2xl shadow-orange-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl" />
          
          <div className="relative">
            <div
              className="grid gap-3 bg-black/40 p-3 rounded-xl"
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {tiles.map((row, i) =>
                row.map((value, j) => (
                  <motion.div
                    key={`${i}-${j}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: value ? 1 : 0 }}
                    className={`aspect-square rounded-xl flex items-center justify-center ${
                      value
                        ? `bg-gradient-to-br ${getTileColor(value)} shadow-lg`
                        : 'bg-white/5'
                    }`}
                    style={{
                      boxShadow: value
                        ? `0 0 20px rgba(${
                            value >= 128 ? '251, 191, 36' : '249, 115, 22'
                          }, 0.4)`
                        : 'none',
                    }}
                  >
                    {value > 0 && (
                      <span
                        className={`${
                          value >= 128 ? 'text-3xl' : value >= 16 ? 'text-2xl' : 'text-xl'
                        } text-white drop-shadow-lg`}
                      >
                        {value}
                      </span>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔢</div>
                  <div className="text-2xl text-orange-400 mb-4">2048 Neo</div>
                  <p className="text-gray-400 text-sm">Стрелки для управления</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/50"
            >
              {isPaused ? (
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-white fill-white" />
                  <span className="text-white">Играть</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Pause className="w-5 h-5 text-white" />
                  <span className="text-white">Пауза</span>
                </div>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setScore(0);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Color legend */}
        <div className="mt-6 bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-orange-400 mb-4">Цвета плиток</h3>
          <div className="grid grid-cols-4 gap-3">
            {[2, 4, 8, 16, 32, 64, 128, 256].map((value) => (
              <div
                key={value}
                className={`aspect-square rounded-xl bg-gradient-to-br ${getTileColor(value)} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-yellow-400 mb-3">Как играть</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Используйте стрелки для перемещения</p>
            <p>• Соединяйте одинаковые числа</p>
            <p>• Достигните 2048!</p>
            <p>• Можно играть дальше и выше 2048</p>
          </div>
        </div>
      </div>
    </div>
  );
}
