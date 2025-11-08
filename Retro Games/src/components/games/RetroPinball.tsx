import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface RetroPinballProps {
  onBack: () => void;
  settings: GameSettings;
}

export function RetroPinball({ onBack, settings }: RetroPinballProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(3);
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-violet-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-violet-400" />
          <span className="text-violet-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            🧩 Retro Pinball
          </h1>
          <p className="text-violet-300/60 text-sm mt-1">Набирайте максимум очков!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-violet-500/30 rounded-xl p-4">
            <div className="text-sm text-violet-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-violet-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-xl p-4">
            <div className="text-sm text-pink-400/60 mb-1">Шары</div>
            <div className="flex gap-2">
              {Array.from({ length: balls }).map((_, i) => (
                <div key={i} className="text-2xl">⚾</div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Множитель
            </div>
            <div className="text-3xl text-yellow-400">x{multiplier}</div>
          </div>
        </div>

        {/* Pinball Table */}
        <div className="relative bg-gradient-to-b from-indigo-900 via-purple-900 to-violet-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-violet-500/30" style={{ aspectRatio: '9/16' }}>
          {/* Neon glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
          
          {/* Top bumpers */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }}
              >
                <span className="text-white text-sm">100</span>
              </motion.div>
            ))}
          </div>

          {/* Side bumpers */}
          <div className="absolute top-1/3 left-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}
            >
              <span className="text-white text-sm">500</span>
            </motion.div>
          </div>
          
          <div className="absolute top-1/3 right-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}
            >
              <span className="text-white text-sm">500</span>
            </motion.div>
          </div>

          {/* Star targets */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="absolute text-3xl"
              style={{
                top: `${30 + i * 10}%`,
                left: `${20 + (i % 2) * 40}%`,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Ball */}
          <motion.div
            animate={{
              x: ['30%', '70%', '30%'],
              y: ['40%', '60%', '40%'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-white to-gray-300"
            style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 1)' }}
          />

          {/* Flippers */}
          <div className="absolute bottom-16 left-1/4 w-24 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full origin-left transform -rotate-12"
            style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}
          />
          <div className="absolute bottom-16 right-1/4 w-24 h-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full origin-right transform rotate-12"
            style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}
          />

          {/* Launch lane */}
          <div className="absolute right-4 top-1/4 bottom-4 w-8 border-2 border-violet-400/50 rounded-lg" />

          {isPaused && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧩</div>
                <div className="text-2xl text-violet-400 mb-4">Retro Pinball</div>
                <p className="text-gray-400 text-sm">Shift/Пробел для флипперов</p>
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
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/50"
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
              setBalls(3);
              setMultiplier(1);
              setIsPaused(true);
            }}
            className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Bonus targets */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-cyan-400 text-sm">100 очков</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-pink-400 text-sm">500 очков</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-yellow-400 text-sm">x2 множитель</div>
          </div>
        </div>
      </div>
    </div>
  );
}
