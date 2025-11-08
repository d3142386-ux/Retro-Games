import { motion } from 'motion/react';
import { X, Sun, Volume2, Globe, Music, Zap, Vibrate, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { GameSettings } from '../App';

interface SettingsProps {
  settings: GameSettings;
  onClose: () => void;
  onUpdateSettings: (settings: GameSettings) => void;
}

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
];

export function Settings({ settings, onClose, onUpdateSettings }: SettingsProps) {
  const [editedSettings, setEditedSettings] = useState(settings);
  const [searchLang, setSearchLang] = useState('');

  const handleSave = () => {
    onUpdateSettings(editedSettings);
    onClose();
  };

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchLang.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchLang.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, x: 300 }}
        animate={{ scale: 1, x: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border border-purple-500/30 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-xl border-b border-white/10 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Настройки
            </h2>
            <button
              onClick={onClose}
              className="p-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-black/80 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Brightness */}
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Sun className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white">Яркость</h3>
                <p className="text-sm text-gray-400">Настройте яркость экрана</p>
              </div>
              <span className="text-2xl text-yellow-500">{editedSettings.brightness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={editedSettings.brightness}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, brightness: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-black/40 rounded-full appearance-none cursor-pointer slider-yellow"
            />
          </div>

          {/* Volume */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Volume2 className="w-6 h-6 text-cyan-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white">Громкость</h3>
                <p className="text-sm text-gray-400">Общая громкость звука</p>
              </div>
              <span className="text-2xl text-cyan-500">{editedSettings.volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={editedSettings.volume}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, volume: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-black/40 rounded-full appearance-none cursor-pointer slider-cyan"
            />
          </div>

          {/* Language */}
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white">Язык</h3>
                <p className="text-sm text-gray-400">Выберите язык интерфейса</p>
              </div>
            </div>
            
            {/* Search */}
            <input
              type="text"
              value={searchLang}
              onChange={(e) => setSearchLang(e.target.value)}
              placeholder="Поиск языка..."
              className="w-full px-4 py-3 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-all"
            />

            {/* Language grid */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setEditedSettings({ ...editedSettings, language: lang.code })}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    editedSettings.language === lang.code
                      ? 'bg-purple-500/30 border border-purple-500/50'
                      : 'bg-black/20 border border-white/5 hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white">{lang.name}</span>
                  {editedSettings.language === lang.code && (
                    <Sparkles className="w-4 h-4 text-purple-400 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Effects */}
          <div className="bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Zap className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-white">Звуковые эффекты</h3>
                  <p className="text-sm text-gray-400">Звуки действий в игре</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setEditedSettings({ ...editedSettings, soundEffects: !editedSettings.soundEffects })
                }
                className={`relative w-16 h-8 rounded-full transition-all ${
                  editedSettings.soundEffects ? 'bg-pink-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: editedSettings.soundEffects ? 32 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>

          {/* Music */}
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Music className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white">Фоновая музыка</h3>
                  <p className="text-sm text-gray-400">Музыка в играх</p>
                </div>
              </div>
              <button
                onClick={() => setEditedSettings({ ...editedSettings, music: !editedSettings.music })}
                className={`relative w-16 h-8 rounded-full transition-all ${
                  editedSettings.music ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: editedSettings.music ? 32 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>

          {/* Particles */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white">Визуальные эффекты</h3>
                  <p className="text-sm text-gray-400">Частицы и анимации</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setEditedSettings({ ...editedSettings, particles: !editedSettings.particles })
                }
                className={`relative w-16 h-8 rounded-full transition-all ${
                  editedSettings.particles ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: editedSettings.particles ? 32 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>

          {/* Vibration */}
          <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Vibrate className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white">Вибрация</h3>
                  <p className="text-sm text-gray-400">Тактильная отдача</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setEditedSettings({ ...editedSettings, vibration: !editedSettings.vibration })
                }
                className={`relative w-16 h-8 rounded-full transition-all ${
                  editedSettings.vibration ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: editedSettings.vibration ? 32 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <span className="text-white">Сохранить настройки</span>
          </button>
        </div>
      </motion.div>

      <style>{`
        .slider-yellow::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #fbbf24, #f59e0b);
          cursor: pointer;
          box-shadow: 0 0 10px #fbbf24;
        }
        
        .slider-cyan::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #06b6d4, #0891b2);
          cursor: pointer;
          box-shadow: 0 0 10px #06b6d4;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}
