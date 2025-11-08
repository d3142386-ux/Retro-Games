import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface SoftSkyProps {
  onBack: () => void;
  settings: GameSettings;
}

export function SoftSky({ onBack, settings }: SoftSkyProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(3850);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
            ☁️ Soft Sky
          </h1>
          <p className="text-cyan-300/60 text-sm mt-1">Прыгайте выше и выше!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Score */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-5xl text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">{score}</div>
            <div className="text-cyan-400/60 text-sm mt-1">Высота</div>
          </div>
          <div className="text-center">
            <div className="text-5xl text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">{highScore}</div>
            <div className="text-purple-400/60 text-sm mt-1">Рекорд</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-cyan-200 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '9/16', maxHeight: '70vh' }}>
          {/* Clouds background */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
              className="absolute w-24 h-12 bg-white/40 rounded-full blur-sm"
              style={{ left: `${Math.random() * 80}%` }}
            />
          ))}

          {/* Character */}
          <motion.div
            animate={{ y: isPaused ? '50%' : ['50%', '30%', '50%'] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute left-1/2 -translate-x-1/2 text-5xl drop-shadow-lg"
          >
            🐰
          </motion.div>

          {/* Platforms */}
          <div className="absolute inset-0">
            {Array.from({ length: 10 }).map((_, i) => {
              const isGreen = i % 3 === 0;
              const isMoving = i % 4 === 0;
              const isBreaking = i % 5 === 0;

              return (
                <motion.div
                  key={i}
                  animate={isMoving ? { x: [-20, 20, -20] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute h-3 ${
                    isBreaking
                      ? 'bg-gradient-to-r from-red-400 to-red-600 w-16'
                      : isGreen
                      ? 'bg-gradient-to-r from-green-400 to-green-600 w-20'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 w-20'
                  } rounded-full shadow-lg`}
                  style={{
                    top: `${10 + i * 9}%`,
                    left: `${20 + (i % 4) * 20}%`,
                    boxShadow: `0 0 15px rgba(${
                      isBreaking ? '239, 68, 68' : isGreen ? '34, 197, 94' : '59, 130, 246'
                    }, 0.5)`,
                  }}
                />
              );
            })}
          </div>

          {/* Power-ups */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute text-2xl"
              style={{
                top: `${20 + i * 25}%`,
                left: `${30 + i * 15}%`,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">☁️</div>
                <div className="text-3xl text-white mb-4">Soft Sky</div>
                <p className="text-cyan-200">Наклоняйте устройство или стрелки ← →</p>
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
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-xl shadow-lg shadow-cyan-500/50"
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

        {/* Platform types */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="w-16 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-2" />
            <div className="text-blue-400 text-sm">Обычная</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-4 text-center">
            <div className="w-16 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-2" />
            <div className="text-green-400 text-sm">Прыжок</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 text-center">
            <div className="w-16 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mb-2" />
            <div className="text-red-400 text-sm">Ломается</div>
          </div>
        </div>
      </div>
    </div>
  );
}
