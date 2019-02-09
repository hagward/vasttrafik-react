import { useState } from "react";

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
