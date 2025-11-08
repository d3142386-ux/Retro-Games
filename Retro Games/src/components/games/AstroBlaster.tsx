import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Shield } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface AstroBlasterProps {
  onBack: () => void;
  settings: GameSettings;
}

export function AstroBlaster({ onBack, settings }: AstroBlasterProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-blue-400 to-indigo-700 bg-clip-text text-transparent">
            🚀 Astro Blaster
          </h1>
          <p className="text-blue-300/60 text-sm mt-1">Защитите галактику!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
            <div className="text-sm text-blue-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-blue-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1 flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Жизни
            </div>
            <div className="flex gap-2">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-red-500 fill-red-500" />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
            <div className="text-sm text-purple-400/60 mb-1">Волна</div>
            <div className="text-3xl text-purple-400">{wave}</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/30" style={{ aspectRatio: '9/16' }}>
          {/* Space background */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
            {/* Stars */}
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Moving stars for parallax */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`moving-${i}`}
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'linear' }}
                className="absolute w-0.5 h-2 bg-white/50"
                style={{ left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          {/* Enemies */}
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const enemyType = row % 3;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, 20, 0, -20, 0],
                    y: isPaused ? 0 : [0, 5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute text-4xl"
                  style={{
                    top: `${10 + row * 12}%`,
                    left: `${15 + col * 20}%`,
                  }}
                >
                  {enemyType === 0 ? '👽' : enemyType === 1 ? '🛸' : '☄️'}
                </motion.div>
              );
            })}
          </div>

          {/* Enemy bullets */}
          {!isPaused && Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="absolute w-2 h-6 bg-gradient-to-b from-red-500 to-transparent rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
              }}
            />
          ))}

          {/* Player ship */}
          <motion.div
            animate={{ x: isPaused ? 0 : [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-6xl"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 1))' }}
          >
            🚀
          </motion.div>

          {/* Player bullets */}
          {!isPaused && Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ['100%', '-10%'] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-cyan-400 to-transparent rounded-full"
              style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}
            />
          ))}

          {/* Power-ups */}
          {Array.from({ length: 2 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ['0%', '100%'],
                rotate: 360,
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
              className="absolute text-2xl"
              style={{ left: `${30 + i * 40}%` }}
            >
              {i === 0 ? '⭐' : '🛡️'}
            </motion.div>
          ))}

          {/* Explosions */}
          {!isPaused && Math.random() > 0.7 && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/3 left-1/2 text-4xl"
            >
              💥
            </motion.div>
          )}

          {isPaused && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🚀</div>
                <div className="text-3xl text-white mb-4">Astro Blaster</div>
                <p className="text-blue-200">Стрелки + Пробел для стрельбы</p>
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
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-700 rounded-xl shadow-lg shadow-blue-500/50"
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
              setWave(1);
              setIsPaused(true);
            }}
            className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Power-ups info */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { icon: '⭐', name: 'Очки', color: 'yellow' },
            { icon: '🛡️', name: 'Щит', color: 'blue' },
            { icon: '⚡', name: 'Мощь', color: 'purple' },
            { icon: '💚', name: 'Жизнь', color: 'green' },
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
