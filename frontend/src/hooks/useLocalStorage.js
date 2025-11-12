// src/hooks/useLocalStorage.js
import { useCallback, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setSafe = useCallback((value) => {
    try {
      const newVal = typeof value === 'function' ? value(state) : value;
      setState(newVal);
      localStorage.setItem(key, JSON.stringify(newVal));
    } catch (err) {
      console.error('useLocalStorage set error', err);
    }
  }, [key, state]);

  return [state, setSafe];
}
