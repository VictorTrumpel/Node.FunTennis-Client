import { useForm } from "@components/ui/form/Form";
import get from "lodash.get";
import { toJS } from "mobx";
import { FieldState } from "@store/BaseForm/@types";
import { ChangeEvent } from "react";

export const useFormInput = (name: string) => {
  const { formState, onChange, defaultValues } = useForm();

  const defaultValue = get(toJS(defaultValues), name);
  const fieldState = get(toJS(formState), name) as FieldState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(name, e.target.value);
  };

  return {
    handleChange,
    handleSelect,
    fieldState,
    defaultValue,
  };
};
