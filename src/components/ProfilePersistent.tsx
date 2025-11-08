import React from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import type { UserProfile } from '../App';

export const ProfilePersistent: React.FC<{ onUpdate?: (p: UserProfile) => void }> = ({ onUpdate }) => {
  const [profile, setProfile] = usePersistentState<UserProfile>('userProfile', {
    nickname: 'CyberPlayer',
    nicknameColor: '#00ff88',
    backgroundImage: null,
    avatar: null,
    level: 1,
    xp: 0,
    coins: 0,
  });

  React.useEffect(() => {
    onUpdate?.(profile);
  }, [profile, onUpdate]);

  return (
    <div className="bg-black/40 p-4 rounded-xl">
      <h3 className="text-lg mb-2">Профиль (persistent)</h3>
      <div>Ник: {profile.nickname}</div>
      <div>Уровень: {profile.level}</div>
    </div>
  );
};