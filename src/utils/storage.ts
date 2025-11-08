// Простая обёртка над localStorage для безопасного сохранения JSON
export function setJSON(key: string, value: unknown) {
  try {
    const s = JSON.stringify(value);
    localStorage.setItem(key, s);
  } catch (e) {
    console.error('[storage] setJSON error', e);
  }
}

export function getJSON<T = any>(key: string, defaultValue: T | null = null): T | null {
  try {
    const s = localStorage.getItem(key);
    if (!s) return defaultValue;
    return JSON.parse(s) as T;
  } catch (e) {
    console.error('[storage] getJSON error', e);
    return defaultValue;
  }
}

export function removeKey(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('[storage] removeKey error', e);
  }
}