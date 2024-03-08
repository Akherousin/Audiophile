import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);

    if (JSON.stringify(storedValue) !== item) {
      setStoredValue(item ? JSON.parse(item) : initialValue);
    }
  }, [key, initialValue, storedValue]);

  // Function to set the value both in state and localStorage
  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as [typeof storedValue, typeof setValue];
}
