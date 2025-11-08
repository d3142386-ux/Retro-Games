import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface NeonDuelProps {
  onBack: () => void;
  settings: GameSettings;
}

export function NeonDuel({ onBack, settings }: NeonDuelProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [scoreLeft, setScoreLeft] = useState(3);
  const [scoreRight, setScoreRight] = useState(5);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-pink-400" />
          <span className="text-pink-400">Назад</span>
        </motion.button>

        <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          🏓 Neon Duel
        </h1>

        <div className="w-32" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Score Display */}
        <div className="flex items-center justify-center gap-12 mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-7xl text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
              {scoreLeft}
            </div>
            <div className="text-pink-400/60 mt-2">Игрок 1</div>
          </motion.div>

          <div className="text-4xl text-white/20">:</div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-7xl text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              {scoreRight}
            </div>
            <div className="text-purple-400/60 mt-2">Игрок 2</div>
          </motion.div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-pink-500/30 rounded-2xl p-8 shadow-2xl shadow-pink-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl" />
          
          {/* Playing field */}
          <div className="relative bg-black/40 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-2 border-dashed border-white/20" />
            
            {/* Left paddle */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-24 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full shadow-lg shadow-pink-500/70"
              style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}
            />

            {/* Right paddle */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-500/70"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}
            />

            {/* Ball */}
            <motion.div
              animate={{
                x: ['30%', '70%', '30%'],
                y: ['40%', '60%', '40%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-4 h-4 bg-white rounded-full"
              style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 1)' }}
            />

            {/* Trail effect */}
            <motion.div
              animate={{
                x: ['30%', '70%', '30%'],
                y: ['40%', '60%', '40%'],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.05 }}
              className="absolute w-3 h-3 bg-white/50 rounded-full blur-sm"
            />

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏓</div>
                  <div className="text-2xl text-pink-400 mb-4">Neon Duel</div>
                  <p className="text-gray-400 text-sm">W/S и ↑/↓ для управления</p>
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
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/50"
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
                setScoreLeft(0);
                setScoreRight(0);
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
          <div className="bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-xl p-6">
            <h3 className="text-pink-400 mb-3">Игрок 1</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• W - Вверх</p>
              <p>• S - Вниз</p>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-purple-400 mb-3">Игрок 2</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• ↑ - Вверх</p>
              <p>• ↓ - Вниз</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
