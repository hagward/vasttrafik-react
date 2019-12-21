import { useEffect, useState } from "react";

// https://usehooks.com/
export function useLocalStorage(key: string, initialValue: any) {
  const [item, setInnerValue] = useState(() =>
    window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key)!)
      : initialValue
  );

  const setValue = (value: any) => {
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
