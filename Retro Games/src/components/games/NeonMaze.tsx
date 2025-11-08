import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface NeonMazeProps {
  onBack: () => void;
  settings: GameSettings;
}

export function NeonMaze({ onBack, settings }: NeonMazeProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const mazeSize = 19;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
            🌀 Neon Maze
          </h1>
          <p className="text-yellow-300/60 text-sm mt-1">Собирайте все точки!</p>
        </div>

        <div className="w-32" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
            <div className="text-sm text-yellow-400/60 mb-1">Счёт</div>
            <div className="text-3xl text-yellow-400">{score}</div>
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
            <div className="text-sm text-red-400/60 mb-1">Жизни</div>
            <div className="flex gap-2">
              {Array.from({ length: lives }).map((_, i) => (
                <div key={i} className="text-2xl">❤️</div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 rounded-2xl p-6 shadow-2xl shadow-yellow-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl" />
          
          <div className="relative">
            {/* Maze */}
            <div
              className="grid gap-0 bg-black/60 p-2 rounded-xl mx-auto"
              style={{
                gridTemplateColumns: `repeat(${mazeSize}, 1fr)`,
                maxWidth: '600px',
              }}
            >
              {Array.from({ length: mazeSize * mazeSize }).map((_, i) => {
                const row = Math.floor(i / mazeSize);
                const col = i % mazeSize;
                
                // Create maze pattern
                const isWall = 
                  (row === 0 || row === mazeSize - 1 || col === 0 || col === mazeSize - 1) ||
                  (row % 2 === 0 && col % 2 === 0) ||
                  (row === 9 && col > 4 && col < 14);
                
                const isPacman = row === 9 && col === 2;
                const isGhost = 
                  (row === 5 && col === 5) ||
                  (row === 5 && col === 13) ||
                  (row === 13 && col === 5) ||
                  (row === 13 && col === 13);
                const isPowerPellet = 
                  (row === 1 && col === 1) ||
                  (row === 1 && col === 17) ||
                  (row === 17 && col === 1) ||
                  (row === 17 && col === 17);
                const hasDot = !isWall && !isPacman && !isGhost && Math.random() > 0.3;
                
                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center ${
                      isWall
                        ? 'bg-blue-600 border border-blue-400 rounded-sm shadow-[0_0_5px_rgba(59,130,246,0.5)]'
                        : 'bg-black/40'
                    }`}
                  >
                    {isPacman && (
                      <div className="text-lg">🟡</div>
                    )}
                    {isGhost && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-lg"
                      >
                        👻
                      </motion.div>
                    )}
                    {isPowerPellet && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,1)]"
                      />
                    )}
                    {hasDot && !isPowerPellet && (
                      <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌀</div>
                  <div className="text-2xl text-yellow-400 mb-4">Neon Maze</div>
                  <p className="text-gray-400 text-sm">Стрелки для управления</p>
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
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg shadow-yellow-500/50"
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
                setIsPaused(true);
              }}
              className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Ghosts info */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { ghost: '🔴', name: 'Blinky', color: 'red' },
            { ghost: '🩷', name: 'Pinky', color: 'pink' },
            { ghost: '🩵', name: 'Inky', color: 'cyan' },
            { ghost: '🟠', name: 'Clyde', color: 'orange' },
          ].map((ghost) => (
            <div
              key={ghost.name}
              className={`bg-black/40 backdrop-blur-xl border border-${ghost.color}-500/30 rounded-xl p-4 text-center`}
            >
              <div className="text-3xl mb-2">{ghost.ghost}</div>
              <div className={`text-${ghost.color}-400 text-sm`}>{ghost.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
