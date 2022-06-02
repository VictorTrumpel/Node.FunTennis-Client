import { useForm } from "@components/ui/form/Form";
import get from "lodash.get";
import { toJS } from "mobx";
import { FieldState } from "@store/BaseForm/@types";
import { ChangeEvent, useCallback, useMemo } from "react";

export type HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => void;
export type HandleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => void;

export const useFormInput = (name: string) => {
  const { formState, onChange, defaultValues } = useForm();

  const defaultValue = useMemo(() => get(toJS(defaultValues), name), []);
  const fieldState = get(toJS(formState), name) as FieldState;

  const handleChange: HandleInputChange = useCallback((e) => {
    onChange(name, e.target.value);
  }, []);

  const handleSelect: HandleSelectChange = useCallback((e) => {
    onChange(name, e.target.value);
  }, []);

  return {
    handleChange,
    handleSelect,
    fieldState,
    defaultValue,
  };
};
