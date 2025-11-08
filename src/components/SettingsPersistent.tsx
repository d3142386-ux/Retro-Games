import React from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import type { GameSettings } from '../App';

export const SettingsPersistent: React.FC<{ onUpdate?: (s: GameSettings) => void }> = ({ onUpdate }) => {
  const [settings, setSettings] = usePersistentState<GameSettings>('gameSettings', {
    brightness: 80,
    volume: 70,
    language: 'ru',
    soundEffects: true,
    music: true,
    particles: true,
    vibration: true,
  });

  React.useEffect(() => {
    onUpdate?.(settings);
  }, [settings, onUpdate]);

  return (
    <div className="bg-black/40 p-4 rounded-xl">
      <h3 className="text-lg mb-2">Настройки (persistent)</h3>
      <div>Громкость: {settings.volume}</div>
    </div>
  );
};