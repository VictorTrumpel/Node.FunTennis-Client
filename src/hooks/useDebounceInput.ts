import { ChangeEvent, useState } from "react";
import { useDebounce } from "@hooks/useDebounce";

export const useDebounceInput = (delay: number = 500) => {
  const [value, setValue] = useState("");

  const debounceChange = useDebounce(handleChange, delay);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return { value, debounceChange };
};
