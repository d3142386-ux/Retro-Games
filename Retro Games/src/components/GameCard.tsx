import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: {
    emoji: string;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  onSelect: () => void;
}

export function GameCard({ game, index, onSelect }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all hover:border-white/30"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{game.emoji}</div>
        <h3 className="text-xl text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-cyan-200 transition-all">
          {game.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{game.description}</p>
        
        {/* Play button */}
        <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <Play className="w-4 h-4 fill-current" />
          <span className="text-sm">Играть</span>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
    </motion.div>
  );
}
