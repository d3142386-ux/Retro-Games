import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface SkyGlideProps {
  onBack: () => void;
  settings: GameSettings;
}

export function SkyGlide({ onBack, settings }: SkyGlideProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(142);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-sky-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-sky-400" />
          <span className="text-sky-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            🕊️ Sky Glide
          </h1>
          <p className="text-sky-300/60 text-sm mt-1">Нажмите пробел или коснитесь экрана</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Score */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-5xl text-sky-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]">{score}</div>
            <div className="text-sky-400/60 text-sm mt-1">Счёт</div>
          </div>
          <div className="text-center">
            <div className="text-5xl text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">{bestScore}</div>
            <div className="text-yellow-400/60 text-sm mt-1">Рекорд</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-b from-sky-300 to-sky-500 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
          {/* Clouds background */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: ['-10%', '110%'] }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-32 h-16 bg-white/30 rounded-full blur-sm"
              style={{ top: `${10 + i * 20}%` }}
            />
          ))}

          {/* Sun */}
          <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_60px_rgba(253,224,71,0.8)]" />

          {/* Bird */}
          <motion.div
            animate={{ y: isPaused ? 0 : [0, -30, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute left-1/4 top-1/2 -translate-y-1/2 text-6xl drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
          >
            🕊️
          </motion.div>

          {/* Pipes */}
          <div className="absolute right-1/4 top-0 w-16 bg-gradient-to-b from-green-600 to-green-700 border-4 border-green-800 rounded-b-lg h-48 shadow-lg" />
          <div className="absolute right-1/4 bottom-0 w-16 bg-gradient-to-t from-green-600 to-green-700 border-4 border-green-800 rounded-t-lg h-48 shadow-lg" />

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-green-600 to-green-800 border-t-4 border-green-900">
            <div className="flex h-full items-center justify-around px-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-4 h-12 bg-green-700 rounded-t-full" />
              ))}
            </div>
          </div>

          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🕊️</div>
                <div className="text-3xl text-white mb-4">Sky Glide</div>
                <p className="text-sky-200">Коснитесь или нажмите пробел!</p>
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
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-lg shadow-sky-500/50"
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

        {/* Tips */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-black/40 backdrop-blur-xl border border-sky-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sky-400 text-sm">Пролетайте между труб</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-yellow-400 text-sm">Собирайте звёзды</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-purple-400 text-sm">Побейте рекорд!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
