import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface NeonRushProps {
  onBack: () => void;
  settings: GameSettings;
}

export function NeonRush({ onBack, settings }: NeonRushProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [distance, setDistance] = useState(0);
  const [coins, setCoins] = useState(0);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-fuchsia-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-fuchsia-400" />
          <span className="text-fuchsia-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-400 to-pink-600 bg-clip-text text-transparent">
            🏃 Neon Rush
          </h1>
          <p className="text-fuchsia-300/60 text-sm mt-1">Бегите как можно дальше!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-fuchsia-500/30 rounded-xl p-4">
            <div className="text-sm text-fuchsia-400/60 mb-1">Дистанция</div>
            <div className="text-3xl text-fuchsia-400">{distance}m</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1">Монеты</div>
            <div className="text-3xl text-yellow-400">{coins}</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-b from-purple-900 via-fuchsia-900 to-pink-900 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
          {/* Neon grid background */}
          <div className="absolute inset-0" style={{ perspective: '1000px' }}>
            <div
              className="absolute inset-x-0 bottom-0 h-full"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(236, 72, 153, 0.3) 50px, rgba(236, 72, 153, 0.3) 51px)',
                transform: 'rotateX(60deg)',
                transformOrigin: 'bottom',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-full"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(236, 72, 153, 0.3) 50px, rgba(236, 72, 153, 0.3) 51px)',
                transform: 'rotateX(60deg)',
                transformOrigin: 'bottom',
              }}
            />
          </div>

          {/* Horizon glow */}
          <div className="absolute top-1/2 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/50 to-transparent blur-2xl" />

          {/* Player */}
          <motion.div
            animate={{ y: isPaused ? 0 : [-10, 0, -10] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute left-1/4 bottom-20 text-6xl drop-shadow-[0_0_30px_rgba(236,72,153,1)]"
          >
            🏃
          </motion.div>

          {/* Obstacles */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: ['100%', '-20%'] }}
              transition={{ duration: 2 - i * 0.3, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-20 h-16 w-12 bg-gradient-to-t from-red-500 to-red-700 rounded-t-lg"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)',
                right: `${i * 30}%`,
              }}
            />
          ))}

          {/* Coins */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: ['100%', '-20%'], rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              className="absolute bottom-40 text-3xl"
              style={{ right: `${10 + i * 20}%` }}
            >
              🪙
            </motion.div>
          ))}

          {/* Speed lines */}
          {!isPaused &&
            Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.1 }}
                className="absolute h-1 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-50"
                style={{
                  top: `${20 + i * 8}%`,
                  right: 0,
                  width: '200px',
                }}
              />
            ))}

          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🏃</div>
                <div className="text-3xl text-white mb-4">Neon Rush</div>
                <p className="text-fuchsia-200">Пробел для прыжка, ↑/↓ для движения</p>
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
            className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-600 rounded-xl shadow-lg shadow-fuchsia-500/50"
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
              setDistance(0);
              setCoins(0);
              setIsPaused(true);
            }}
            className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Power-ups */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: '⚡', name: 'Ускорение', color: 'yellow' },
            { icon: '🛡️', name: 'Щит', color: 'blue' },
            { icon: '🧲', name: 'Магнит монет', color: 'purple' },
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
