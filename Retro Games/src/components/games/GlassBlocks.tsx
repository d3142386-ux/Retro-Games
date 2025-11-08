import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface GlassBlocksProps {
  onBack: () => void;
  settings: GameSettings;
}

export function GlassBlocks({ onBack, settings }: GlassBlocksProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);

  const rows = 20;
  const cols = 10;

  // Example tetromino shapes
  const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            🧱 Glass Blocks
          </h1>
          <p className="text-cyan-300/60 text-sm mt-1">Управление: стрелки, пробел для поворота</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[250px_1fr_250px] gap-6">
          {/* Left Panel - Next */}
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-cyan-400 mb-4">Следующая</h3>
              <div className="bg-black/40 rounded-xl p-4 h-32 flex items-center justify-center">
                {/* Example next piece */}
                <div className="grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                    const isBlock = i === 5 || i === 6 || i === 9 || i === 10;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded ${
                          isBlock
                            ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50'
                            : ''
                        }`}
                        style={{
                          backdropFilter: isBlock ? 'blur(10px)' : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-purple-400 mb-4">Сохранённая</h3>
              <div className="bg-black/40 rounded-xl p-4 h-32 flex items-center justify-center">
                <div className="text-gray-600">Нажмите C</div>
              </div>
            </div>
          </div>

          {/* Center - Game Area */}
          <div className="relative">
            {/* Stats */}
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4">
                <div className="text-sm text-cyan-400/60 mb-1">Счёт</div>
                <div className="text-3xl text-cyan-400">{score}</div>
              </div>
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm text-blue-400/60 mb-1">Линии</div>
                <div className="text-3xl text-blue-400">{lines}</div>
              </div>
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
                <div className="text-sm text-purple-400/60 mb-1">Уровень</div>
                <div className="text-3xl text-purple-400">{level}</div>
              </div>
            </div>

            {/* Game Grid */}
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl" />
              
              <div
                className="relative grid gap-[2px] bg-black/60 p-2 rounded-xl"
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                }}
              >
                {Array.from({ length: rows * cols }).map((_, i) => {
                  const row = Math.floor(i / cols);
                  const col = i % cols;
                  
                  // Example placed blocks
                  const hasBlock = row >= 18 && Math.random() > 0.4;
                  const colorIndex = Math.floor(Math.random() * colors.length);
                  const color = colors[colorIndex];
                  
                  // Current falling piece
                  const isFalling = row === 3 && col >= 4 && col <= 5;
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm transition-all ${
                        isFalling
                          ? 'bg-gradient-to-br from-yellow-400/80 to-orange-500/80 shadow-lg shadow-yellow-500/50 backdrop-blur-sm'
                          : hasBlock
                          ? `bg-gradient-to-br from-${color}-400/60 to-${color}-600/60 backdrop-blur-sm border border-${color}-300/30`
                          : 'bg-white/5'
                      }`}
                      style={{
                        boxShadow: hasBlock ? `0 0 10px rgba(99, 179, 237, 0.3)` : 'none',
                      }}
                    />
                  );
                })}
              </div>

              {isPaused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🧱</div>
                    <div className="text-2xl text-cyan-400 mb-4">Glass Blocks</div>
                    <p className="text-gray-400 text-sm">Заполняйте линии!</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaused(!isPaused)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
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
                  setLines(0);
                  setLevel(1);
                  setIsPaused(true);
                }}
                className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-black/60 transition-all"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Right Panel - Stats */}
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
              <h3 className="text-yellow-400 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Комбо
              </h3>
              <div className="text-center">
                <div className="text-5xl text-yellow-400 mb-2">x4</div>
                <div className="text-sm text-gray-400">Отлично!</div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-cyan-400 mb-4">Статистика</h3>
              <div className="space-y-3">
                {[
                  { label: 'Одиночные', value: 12, color: 'cyan' },
                  { label: 'Двойные', value: 8, color: 'blue' },
                  { label: 'Тройные', value: 3, color: 'purple' },
                  { label: 'Tetris', value: 2, color: 'pink' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className={`text-${stat.color}-400`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-purple-400 mb-3">Управление</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• ← → Движение</p>
                <p>• ↓ Ускорение</p>
                <p>• Пробел - Поворот</p>
                <p>• C - Сохранить</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
