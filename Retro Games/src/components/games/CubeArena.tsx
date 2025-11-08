import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Bomb } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface CubeArenaProps {
  onBack: () => void;
  settings: GameSettings;
}

export function CubeArena({ onBack, settings }: CubeArenaProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);

  const gridSize = 13;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-red-400" />
          <span className="text-red-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
            💣 Cube Arena
          </h1>
          <p className="text-red-300/60 text-sm mt-1">Уничтожайте врагов бомбами!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-red-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1">Время</div>
            <div className="text-3xl text-yellow-400">{timeLeft}s</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
            <div className="text-sm text-orange-400/60 mb-1 flex items-center gap-1">
              <Bomb className="w-4 h-4" />
              Бомбы
            </div>
            <div className="text-3xl text-orange-400">5</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-red-500/30 rounded-2xl p-4 shadow-2xl shadow-red-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl" />
          
          <div className="relative">
            <div
              className="grid gap-1 bg-gradient-to-br from-green-900 to-green-800 p-2 rounded-xl"
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;
                
                // Walls (indestructible)
                const isWall = row % 2 === 0 && col % 2 === 0;
                
                // Destructible blocks
                const isBlock = !isWall && Math.random() > 0.6;
                
                // Player
                const isPlayer = row === 1 && col === 1;
                
                // Enemies
                const isEnemy = 
                  (row === 1 && col === 11) ||
                  (row === 11 && col === 1) ||
                  (row === 11 && col === 11) ||
                  (row === 6 && col === 6);
                
                // Bomb
                const isBomb = row === 3 && col === 1;
                
                // Power-ups
                const isPowerUp = !isWall && !isBlock && !isPlayer && !isEnemy && Math.random() > 0.97;

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm ${
                      isWall
                        ? 'bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm'
                        : 'bg-green-700/30'
                    }`}
                  >
                    {isPlayer && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,1)]"
                      >
                        🧑
                      </motion.div>
                    )}
                    {isEnemy && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-2xl drop-shadow-[0_0_10px_rgba(239,68,68,1)]"
                      >
                        👹
                      </motion.div>
                    )}
                    {isBlock && (
                      <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-sm" />
                    )}
                    {isBomb && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="text-xl"
                      >
                        💣
                      </motion.div>
                    )}
                    {isPowerUp && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-lg"
                      >
                        ⭐
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💣</div>
                  <div className="text-2xl text-red-400 mb-4">Cube Arena</div>
                  <p className="text-gray-400 text-sm">Стрелки + Пробел для бомбы</p>
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
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg shadow-red-500/50"
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
                setTimeLeft(180);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Power-ups */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { icon: '💣', name: '+Бомба', color: 'red' },
            { icon: '🔥', name: '+Радиус', color: 'orange' },
            { icon: '⚡', name: '+Скорость', color: 'yellow' },
            { icon: '🛡️', name: 'Защита', color: 'blue' },
          ].map((powerup) => (
            <div
              key={powerup.name}
              className={`bg-black/40 backdrop-blur-xl border border-${powerup.color}-500/30 rounded-xl p-4 text-center`}
            >
              <div className="text-3xl mb-2">{powerup.icon}</div>
              <div className={`text-${powerup.color}-400 text-sm`}>{powerup.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
