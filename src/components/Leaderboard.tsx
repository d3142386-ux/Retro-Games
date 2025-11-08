import React from 'react';
import { getJSON, setJSON } from '../utils/storage';

interface ScoreEntry { name: string; score: number; date: string }

export const Leaderboard: React.FC = () => {
  const [scores, setScores] = React.useState<ScoreEntry[]>(() => getJSON<ScoreEntry[]>('leaderboard', []) || []);

  function addScore(entry: ScoreEntry) {
    const next = [...scores, entry].sort((a, b) => b.score - a.score).slice(0, 10);
    setScores(next);
    setJSON('leaderboard', next);
  }

  return (
    <div className="bg-black/40 p-4 rounded-xl">
      <h3 className="text-lg mb-2">Таблица рекордов</h3>
      <ol className="list-decimal ml-6">
        {scores.length === 0 && <li className="text-gray-400">Пусто</li>}
        {scores.map((s, i) => (
          <li key={i} className="mb-1">{s.name} — {s.score}</li>
        ))}
      </ol>
    </div>
  );
};