import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key);
  const [value, setValue] = useState(
    stored ? JSON.parse(stored) : initialValue,
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
