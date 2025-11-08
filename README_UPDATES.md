# Upgrade notes - feature/full-game-core

This branch adds:
- Persistent storage utilities (src/utils/storage.ts)
- usePersistentState hook (src/hooks/usePersistentState.tsx)
- Audio manager (src/utils/AudioManager.ts)
- GameShell wrapper component (src/components/GameShell.tsx)
- Leaderboard and Achievements components
- Persistent Profile and Settings components
- LICENSE and PRIVACY.md

Integration steps:
1. Replace usages of Profile/Settings in App.tsx to ProfilePersistent/SettingsPersistent or import/use hooks directly.
2. Register audio assets under /public/assets/sfx/ and set music paths when needed via audioManager.setMusic(src).
3. Wrap each game root with <GameShell onSave={...} onLoad={...} onExit={...}> to get standardized pause/save/exit UI.
