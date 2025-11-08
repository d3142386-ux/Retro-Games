import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface PixelGalaxyProps {
  onBack: () => void;
  settings: GameSettings;
}

export function PixelGalaxy({ onBack, settings }: PixelGalaxyProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(3);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            👾 Pixel Galaxy
          </h1>
          <p className="text-purple-300/60 text-sm mt-1">Защитите галактику от захватчиков!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
            <div className="text-sm text-purple-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-purple-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-xl p-4">
            <div className="text-sm text-pink-400/60 mb-1">Волна</div>
            <div className="text-3xl text-pink-400">{wave}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4">
            <div className="text-sm text-cyan-400/60 mb-1">Жизни</div>
            <div className="flex gap-2">
              {Array.from({ length: lives }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/80 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl" />
          
          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            {/* Alien grid */}
            <div className="grid grid-cols-11 gap-4 mb-8">
              {Array.from({ length: 33 }).map((_, i) => {
                const row = Math.floor(i / 11);
                const isDestroyed = Math.random() > 0.6;
                
                if (isDestroyed) return <div key={i} className="aspect-square" />;

                return (
                  <motion.div
                    key={i}
                    animate={{ x: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="aspect-square flex items-center justify-center"
                  >
                    <div className={`text-3xl ${
                      row === 0 ? 'drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]' :
                      row === 1 ? 'drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]' :
                      'drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                    }`}>
                      👾
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Shields */}
            <div className="flex justify-around mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, j) => {
                    const isDestroyed = Math.random() > 0.7;
                    if (isDestroyed) return <div key={j} />;
                    return (
                      <div
                        key={j}
                        className="w-3 h-3 bg-gradient-to-br from-green-500 to-green-700 rounded-sm"
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Player */}
            <div className="relative h-20 flex items-center justify-center">
              <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl drop-shadow-[0_0_20px_rgba(34,211,238,1)]"
              >
                🚀
              </motion.div>

              {/* Laser */}
              <motion.div
                animate={{ y: [-100, -300], opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute bottom-12 w-1 h-12 bg-gradient-to-t from-cyan-400 to-transparent"
              />
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👾</div>
                  <div className="text-2xl text-purple-400 mb-4">Pixel Galaxy</div>
                  <p className="text-gray-400 text-sm">Стрелки + Пробел для стрельбы</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50"
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
                setWave(1);
                setLives(3);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Power-ups */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: '⚡', name: 'Быстрая стрельба', color: 'yellow' },
            { icon: '🛡️', name: 'Щит', color: 'blue' },
            { icon: '💥', name: 'Бомба', color: 'red' },
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
