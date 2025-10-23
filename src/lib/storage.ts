import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T) {
  "use client"
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue
    const emptyValue = Array.isArray(defaultValue) ? "[]" : "{}"
    return (JSON.parse(localStorage.getItem(key) ?? emptyValue) || defaultValue) as T
  })
   
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log({key, value})
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}