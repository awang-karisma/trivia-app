import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  "use client";
  const [value, setValue] = useState(() => {
    try {
      if (typeof window === "undefined") return defaultValue;
      return JSON.parse(localStorage.getItem(key) ?? "") as T;
    } catch {
      return defaultValue as T;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export function deleteStorageKey(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}
