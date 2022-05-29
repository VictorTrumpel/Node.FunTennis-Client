import { useRef, useCallback } from "react";

type Callback = (...args: any[]) => any;

export const useDebounce = <T extends Callback>(callback: T, delay: number) => {
  const timer = useRef<any>();

  const debounce = (...args: any[]) => {
    const currTimer = timer.current;
    if (currTimer) {
      clearTimeout(currTimer);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return useCallback<T>(debounce as T, []);
};
