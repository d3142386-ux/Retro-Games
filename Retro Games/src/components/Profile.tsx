import { motion } from 'motion/react';
import { X, Upload, Camera, Award, TrendingUp, Coins, Star, Palette, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { UserProfile } from '../App';

interface ProfileProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function Profile({ profile, onClose, onUpdateProfile }: ProfileProps) {
  const [editedProfile, setEditedProfile] = useState(profile);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const colorPresets = [
    '#00ff88', '#00d4ff', '#ff00ff', '#ffff00', '#ff6b35',
    '#7c3aed', '#ec4899', '#06b6d4', '#10b981', '#f59e0b',
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({ ...editedProfile, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({ ...editedProfile, backgroundImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    onClose();
  };

  const xpToNextLevel = 10000;
  const xpProgress = (editedProfile.xp / xpToNextLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-cyan-500/30 rounded-3xl shadow-2xl"
      >
        {/* Background Image */}
        <div className="relative h-48 rounded-t-3xl overflow-hidden">
          {editedProfile.backgroundImage ? (
            <img src={editedProfile.backgroundImage} alt="Background" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Upload background button */}
          <button
            onClick={() => bgInputRef.current?.click()}
            className="absolute bottom-4 right-4 p-3 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-black/80 transition-all"
          >
            <ImageIcon className="w-5 h-5 text-white" />
          </button>
          <input
            ref={bgInputRef}
            type="file"
            accept="image/*"
            onChange={handleBgChange}
            className="hidden"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-black/80 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Profile content */}
        <div className="p-6 md:p-8">
          {/* Avatar */}
          <div className="flex items-start gap-6 -mt-20 mb-6">
            <div className="relative">
              {editedProfile.avatar ? (
                <img 
                  src={editedProfile.avatar} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-2xl border-4 border-gray-900 object-cover shadow-2xl" 
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl border-4 border-gray-900 bg-gradient-to-br from-cyan-500 to-purple-600 shadow-2xl" />
              )}
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-xl hover:bg-cyan-600 transition-all shadow-lg"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              
              {/* Level badge */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg">
                <span className="text-lg">{editedProfile.level}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 mt-16">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3 text-center">
                  <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-2xl text-white">{editedProfile.level}</div>
                  <div className="text-xs text-gray-400">Уровень</div>
                </div>
                <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-3 text-center">
                  <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-2xl text-white">{editedProfile.xp}</div>
                  <div className="text-xs text-gray-400">XP</div>
                </div>
                <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-3 text-center">
                  <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-2xl text-white">{editedProfile.coins}</div>
                  <div className="text-xs text-gray-400">Монеты</div>
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Прогресс до уровня {editedProfile.level + 1}</span>
              <span className="text-sm text-cyan-400">{editedProfile.xp} / {xpToNextLevel} XP</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50"
              />
            </div>
          </div>

          {/* Nickname */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Никнейм</label>
            <input
              type="text"
              value={editedProfile.nickname}
              onChange={(e) => setEditedProfile({ ...editedProfile, nickname: e.target.value })}
              className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none transition-all"
              placeholder="Введите никнейм"
            />
          </div>

          {/* Nickname Color */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Цвет никнейма
            </label>
            <div className="grid grid-cols-5 gap-3 mb-3">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => setEditedProfile({ ...editedProfile, nicknameColor: color })}
                  className={`w-full aspect-square rounded-xl transition-all ${
                    editedProfile.nicknameColor === color
                      ? 'ring-4 ring-white/50 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={editedProfile.nicknameColor}
                onChange={(e) => setEditedProfile({ ...editedProfile, nicknameColor: e.target.value })}
                className="w-16 h-10 rounded-xl cursor-pointer bg-transparent"
              />
              <div className="flex-1 px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
                <span style={{ color: editedProfile.nicknameColor }} className="drop-shadow-[0_0_8px_currentColor]">
                  {editedProfile.nickname}
                </span>
              </div>
            </div>
          </div>

          {/* Achievements preview */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Достижения
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl ${
                    i <= 5
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg shadow-yellow-500/50'
                      : 'bg-black/40 border border-white/10'
                  } flex items-center justify-center`}
                >
                  {i <= 5 ? (
                    <Star className="w-6 h-6 text-white fill-current" />
                  ) : (
                    <div className="w-6 h-6 bg-white/10 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            <span className="text-white">Сохранить изменения</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
