import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface HoloGridProps {
  onBack: () => void;
  settings: GameSettings;
}

export function HoloGrid({ onBack, settings }: HoloGridProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [minesLeft, setMinesLeft] = useState(20);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const gridSize = 10;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-slate-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
          <span className="text-slate-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-slate-400 to-gray-600 bg-clip-text text-transparent">
            💣 Holo Grid
          </h1>
          <p className="text-slate-300/60 text-sm mt-1">Найдите все мины!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1 flex items-center gap-1">
              <Flag className="w-4 h-4" />
              Мины
            </div>
            <div className="text-3xl text-red-400">{minesLeft}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4">
            <div className="text-sm text-cyan-400/60 mb-1">Время</div>
            <div className="text-3xl text-cyan-400">{timeElapsed}s</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="relative bg-black/60 backdrop-blur-xl border-2 border-slate-500/30 rounded-2xl p-4 shadow-2xl shadow-slate-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-gray-500/10 rounded-2xl" />
          
          <div className="relative">
            <div
              className="grid gap-1 bg-black/60 p-2 rounded-xl"
              style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;
                
                // Random cell states
                const isRevealed = Math.random() > 0.7;
                const isFlagged = !isRevealed && Math.random() > 0.9;
                const isMine = isRevealed && Math.random() > 0.95;
                const number = isRevealed && !isMine ? Math.floor(Math.random() * 4) : 0;
                
                const numberColors = [
                  'text-gray-500',
                  'text-cyan-400',
                  'text-green-400',
                  'text-yellow-400',
                  'text-orange-400',
                ];

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square flex items-center justify-center text-lg transition-all ${
                      isRevealed
                        ? isMine
                          ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/50'
                          : number > 0
                          ? 'bg-gradient-to-br from-slate-700 to-slate-800'
                          : 'bg-gradient-to-br from-slate-800 to-slate-900'
                        : 'bg-gradient-to-br from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700 shadow-lg'
                    } rounded-lg`}
                  >
                    {isRevealed && isMine && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-2xl"
                      >
                        💣
                      </motion.div>
                    )}
                    {isRevealed && !isMine && number > 0 && (
                      <span className={numberColors[number]}>{number}</span>
                    )}
                    {isFlagged && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xl"
                      >
                        🚩
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💣</div>
                  <div className="text-2xl text-slate-400 mb-4">Holo Grid</div>
                  <p className="text-gray-400 text-sm">ЛКМ - открыть, ПКМ - флаг</p>
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
              className="px-8 py-4 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl shadow-lg shadow-slate-500/50"
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
                setMinesLeft(20);
                setTimeElapsed(0);
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Difficulty levels */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { name: 'Легко', size: '8x8', mines: 10, color: 'green' },
            { name: 'Средне', size: '10x10', mines: 20, color: 'yellow' },
            { name: 'Сложно', size: '16x16', mines: 40, color: 'red' },
          ].map((level) => (
            <button
              key={level.name}
              className={`bg-black/40 backdrop-blur-xl border border-${level.color}-500/30 rounded-xl p-4 text-center hover:bg-black/60 transition-all`}
            >
              <div className={`text-${level.color}-400 mb-2`}>{level.name}</div>
              <div className="text-sm text-gray-400">{level.size}</div>
              <div className="text-xs text-gray-500">{level.mines} мин</div>
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-cyan-400 mb-3">Как играть</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Откройте все клетки без мин</p>
            <p>• Числа показывают количество мин рядом</p>
            <p>• Используйте флаги для пометки мин</p>
            <p>• Будьте осторожны!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
