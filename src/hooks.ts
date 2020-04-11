import { useEffect, useState } from "react";

// https://usehooks.com/
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [item, setInnerValue] = useState<T>(() =>
    window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key)!)
      : initialValue
  );

  const setValue = (value: T) => {
    setInnerValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [item, setValue];
}

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
