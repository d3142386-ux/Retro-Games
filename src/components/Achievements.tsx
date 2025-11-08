import React from 'react';
import { getJSON, setJSON } from '../utils/storage';

export const Achievements: React.FC = () => {
  const [ach, setAch] = React.useState<string[]>(() => getJSON<string[]>('achievements', []) || []);

  function unlock(id: string) {
    if (ach.includes(id)) return;
    const next = [...ach, id];
    setAch(next);
    setJSON('achievements', next);
  }

  return (
    <div className="bg-black/40 p-4 rounded-xl">
      <h3 className="text-lg mb-2">Достижения</h3>
      {ach.length === 0 ? <div className="text-gray-400">Нет достижений</div> : (
        <ul>
          {ach.map((a) => <li key={a}>{a}</li>)}
        </ul>
      )}
    </div>
  );
};