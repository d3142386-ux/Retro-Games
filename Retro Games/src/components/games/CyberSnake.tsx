import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Star } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../../App';

interface CyberSnakeProps {
  onBack: () => void;
  settings: GameSettings;
}

export function CyberSnake({ onBack, settings }: CyberSnakeProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1250);
  const [level, setLevel] = useState(1);

  // Game grid (20x20)
  const gridSize = 20;

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-500/50 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-green-400" />
          <span className="text-green-400">Назад</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            🐍 Cyber Snake
          </h1>
          <p className="text-green-300/60 text-sm mt-1">Управление: стрелки или WASD</p>
        </div>

        <div className="w-32" />
      </div>

      {/* Game Container */}
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          {/* Game Area */}
          <div className="relative">
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
                <div className="text-sm text-green-400/60 mb-1">Счёт</div>
                <div className="text-3xl text-green-400">{score}</div>
              </div>
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
                <div className="text-sm text-yellow-400/60 mb-1 flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Рекорд
                </div>
                <div className="text-3xl text-yellow-400">{highScore}</div>
              </div>
              <div className="flex-1 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4">
                <div className="text-sm text-cyan-400/60 mb-1">Уровень</div>
                <div className="text-3xl text-cyan-400">{level}</div>
              </div>
            </div>

            {/* Game Grid */}
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-4 shadow-2xl shadow-green-500/20">
              {/* Grid glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl" />
              
              {/* Grid */}
              <div
                className="relative grid gap-1 bg-black/40 p-2 rounded-xl"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  aspectRatio: '1',
                }}
              >
                {/* Grid cells */}
                {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                  const row = Math.floor(i / gridSize);
                  const col = i % gridSize;
                  
                  // Snake head (example position)
                  const isSnakeHead = row === 10 && col === 10;
                  // Snake body (example)
                  const isSnakeBody = (row === 10 && col === 9) || (row === 10 && col === 8) || (row === 10 && col === 7);
                  // Food (example)
                  const isFood = row === 15 && col === 15;
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm transition-all ${
                        isSnakeHead
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50'
                          : isSnakeBody
                          ? 'bg-gradient-to-br from-green-500/80 to-emerald-600/80'
                          : isFood
                          ? 'bg-gradient-to-br from-red-400 to-pink-500 shadow-lg shadow-red-500/50 animate-pulse'
                          : 'bg-green-500/5'
                      }`}
                    >
                      {isSnakeHead && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1/3 h-1/3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pause overlay */}
              {isPaused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🐍</div>
                    <div className="text-2xl text-green-400 mb-4">Нажмите Play</div>
                    <p className="text-gray-400 text-sm">Собирайте еду и растите!</p>
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
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all"
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
                  setLevel(1);
                  setIsPaused(true);
                }}
                className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-black/60 transition-all"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Power-ups */}
            <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-green-400 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Усиления
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Скорость x2', icon: '⚡', color: 'yellow' },
                  { name: 'Защита', icon: '🛡️', color: 'blue' },
                  { name: 'Магнит', icon: '🧲', color: 'purple' },
                ].map((powerup, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 bg-black/40 border border-${powerup.color}-500/30 rounded-xl`}
                  >
                    <div className="text-2xl">{powerup.icon}</div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{powerup.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
              <h3 className="text-yellow-400 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Топ игроки
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'CyberPro', score: 5420, rank: 1 },
                  { name: 'SnakeMaster', score: 4850, rank: 2 },
                  { name: 'NeonGamer', score: 3920, rank: 3 },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-3 p-2 bg-black/40 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{player.name}</div>
                      <div className="text-green-400 text-xs">{player.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to play */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-cyan-400 mb-3">Как играть</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Управляйте змеёй стрелками</p>
                <p>• Собирайте неоновую еду</p>
                <p>• Не врезайтесь в себя</p>
                <p>• Растите и набирайте очки!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
