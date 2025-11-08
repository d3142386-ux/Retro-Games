import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface NatureCrossingProps {
  onBack: () => void;
  settings: GameSettings;
}

export function NatureCrossing({ onBack, settings }: NatureCrossingProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const rows = 13;
  const cols = 9;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-green-400" />
          <span className="text-green-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
            🐸 Nature Crossing
          </h1>
          <p className="text-green-300/60 text-sm mt-1">Доберитесь до дома!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
            <div className="text-sm text-green-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-green-400">{score}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1">Жизни</div>
            <div className="flex gap-2">
              {Array.from({ length: lives }).map((_, i) => (
                <div key={i} className="text-2xl">❤️</div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-3 shadow-2xl shadow-green-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl" />
          
          <div className="relative">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {Array.from({ length: rows * cols }).map((_, i) => {
                const row = Math.floor(i / cols);
                const col = i % cols;
                
                // Top - home area
                const isHome = row === 0;
                
                // Water rows
                const isWater = row >= 1 && row <= 5;
                const isLog = isWater && col >= 2 && col <= 4;
                
                // Safe middle row
                const isSafeZone = row === 6;
                
                // Road rows
                const isRoad = row >= 7 && row <= 11;
                const isCar = isRoad && ((row === 8 && col >= 5 && col <= 6) || (row === 10 && col >= 1 && col <= 2));
                
                // Bottom - start
                const isStart = row === 12;
                
                // Frog
                const isFrog = row === 9 && col === 4;

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-lg ${
                      isHome
                        ? 'bg-gradient-to-b from-yellow-400 to-yellow-600'
                        : isWater
                        ? isLog
                          ? 'bg-gradient-to-br from-amber-600 to-amber-800'
                          : 'bg-gradient-to-br from-blue-500 to-blue-700'
                        : isSafeZone
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : isRoad
                        ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                        : isStart
                        ? 'bg-gradient-to-br from-green-600 to-green-800'
                        : 'bg-black/20'
                    }`}
                  >
                    {isHome && col === 4 && '🏠'}
                    {isWater && !isLog && Math.random() > 0.9 && '🌊'}
                    {isCar && '🚗'}
                    {isFrog && '🐸'}
                    {isSafeZone && Math.random() > 0.8 && '🌿'}
                  </div>
                );
              })}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐸</div>
                  <div className="text-2xl text-green-400 mb-4">Nature Crossing</div>
                  <p className="text-gray-400 text-sm">Стрелки для движения</p>
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
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg shadow-green-500/50"
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
                setLives(3);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Instructions */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-blue-400 mb-3">Река</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Прыгайте на брёвна</p>
              <p>• Не падайте в воду</p>
              <p>• Брёвна двигаются</p>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-gray-500/30 rounded-xl p-6">
            <h3 className="text-gray-400 mb-3">Дорога</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Избегайте машин</p>
              <p>• Выбирайте момент</p>
              <p>• Скорость растёт</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
