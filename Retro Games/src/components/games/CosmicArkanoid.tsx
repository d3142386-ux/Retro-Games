import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface CosmicArkanoidProps {
  onBack: () => void;
  settings: GameSettings;
}

export function CosmicArkanoid({ onBack, settings }: CosmicArkanoidProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  const rows = 6;
  const cols = 10;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-indigo-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-indigo-400" />
          <span className="text-indigo-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-indigo-400 to-blue-600 bg-clip-text text-transparent">
            🚀 Cosmic Arkanoid
          </h1>
          <p className="text-indigo-300/60 text-sm mt-1">Разбивайте космические блоки!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4">
            <div className="text-sm text-indigo-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-indigo-400">{score}</div>
          </div>

          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1 flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Жизни
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${
                    i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1">Уровень</div>
            <div className="text-3xl text-yellow-400">{level}</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-indigo-500/30 rounded-2xl p-8 shadow-2xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl" />
          
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            {/* Bricks */}
            <div
              className="grid gap-2 mb-8"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {Array.from({ length: rows * cols }).map((_, i) => {
                const row = Math.floor(i / cols);
                const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
                const color = colors[row % colors.length];
                const isDestroyed = Math.random() > 0.7;

                if (isDestroyed) return <div key={i} />;

                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`aspect-[3/1] rounded-lg bg-gradient-to-br from-${color}-400 to-${color}-600 border border-${color}-300/50 shadow-lg`}
                    style={{
                      boxShadow: `0 0 15px rgba(${
                        color === 'red' ? '239, 68, 68' :
                        color === 'orange' ? '249, 115, 22' :
                        color === 'yellow' ? '234, 179, 8' :
                        color === 'green' ? '34, 197, 94' :
                        color === 'blue' ? '59, 130, 246' :
                        '168, 85, 247'
                      }, 0.5)`,
                    }}
                  />
                );
              })}
            </div>

            {/* Playing field */}
            <div className="relative bg-black/40 rounded-xl h-64">
              {/* Ball */}
              <motion.div
                animate={{
                  x: ['20%', '80%', '20%'],
                  y: ['30%', '70%', '30%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 1)' }}
              />

              {/* Paddle */}
              <motion.div
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg"
                style={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)' }}
              />

              {isPaused && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <div className="text-2xl text-indigo-400 mb-4">Cosmic Arkanoid</div>
                    <p className="text-gray-400 text-sm">Двигайте мышкой или стрелками</p>
                  </div>
                </div>
              )}
            </div>

            {/* Power-ups */}
            <div className="flex gap-4 mt-6 justify-center">
              {[
                { icon: '⚡', name: 'Скорость', color: 'yellow' },
                { icon: '🔥', name: 'Огонь', color: 'orange' },
                { icon: '💎', name: 'Магнит', color: 'cyan' },
              ].map((powerup) => (
                <div
                  key={powerup.name}
                  className={`flex items-center gap-2 px-4 py-2 bg-black/40 border border-${powerup.color}-500/30 rounded-xl`}
                >
                  <span className="text-xl">{powerup.icon}</span>
                  <span className="text-sm text-gray-400">{powerup.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/50"
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
                setLevel(1);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
