import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/AudioManager';

interface GameShellProps {
  children: React.ReactNode;
  onSave?: () => void;
  onLoad?: () => void;
  onExit?: () => void;
}

export const GameShell: React.FC<GameShellProps> = ({ children, onSave, onLoad, onExit }) => {
  const [paused, setPaused] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [win, setWin] = React.useState(false);

  React.useEffect(() => {
    // Example: register basic sfx (place files under public/assets/sfx/)
    audioManager.registerSfx('click', '/assets/sfx/click.mp3');
  }, []);

  function handlePause() {
    setPaused((p) => !p);
    audioManager.playSfx('click');
  }

  function handleGameOver() {
    setGameOver(true);
    audioManager.playSfx('click');
  }

  function handleWin() {
    setWin(true);
    audioManager.playSfx('click');
  }

  return (
    <div className="min-h-screen p-4 md:p-6 relative">
      <div className="z-10 relative">{children}</div>

      <div className="fixed top-4 right-4 flex gap-2 z-20">
        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePause} className="px-3 py-2 rounded bg-black/50">
          {paused ? 'Resume' : 'Pause'}
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { onSave?.(); audioManager.playSfx('click'); }} className="px-3 py-2 rounded bg-black/40">
          Save
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { onLoad?.(); audioManager.playSfx('click'); }} className="px-3 py-2 rounded bg-black/40">
          Load
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { onExit?.(); audioManager.playSfx('click'); }} className="px-3 py-2 rounded bg-red-600/80">
          Exit
        </motion.button>
      </div>

      {paused && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-black/80 p-8 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Пауза</h2>
            <p className="mb-4">Игра на паузе. Нажмите Resume, чтобы продолжить.</p>
            <button onClick={() => setPaused(false)} className="px-4 py-2 bg-cyan-600 rounded">Resume</button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-black/90 p-8 rounded-lg text-center">
            <h2 className="text-3xl mb-4">Game Over</h2>
            <p className="mb-4">Попробуйте ещё раз!</p>
            <button onClick={() => { setGameOver(false); audioManager.playSfx('click'); }} className="px-4 py-2 bg-red-600 rounded">Retry</button>
          </div>
        </div>
      )}

      {win && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-black/90 p-8 rounded-lg text-center">
            <h2 className="text-3xl mb-4">Victory!</h2>
            <p className="mb-4">Отличная работа!</p>
            <button onClick={() => { setWin(false); audioManager.playSfx('click'); }} className="px-4 py-2 bg-green-600 rounded">Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};