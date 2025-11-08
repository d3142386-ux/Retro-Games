import { useState, useEffect } from 'react';
import { getJSON, setJSON } from '../utils/storage';

export function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    const s = getJSON<T>(key, initial);
    return s === null ? initial : s;
  });

  useEffect(() => {
    try {
      setJSON(key, state);
    } catch (e) {
      // ignore
    }
  }, [key, state]);

  return [state, setState] as const;
}