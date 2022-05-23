import { useForm } from "@components/ui/form/Form";
import get from "lodash.get";
import { toJS } from "mobx";
import { FieldState } from "@store/BaseForm/@types";
import { ChangeEvent } from "react";

export const useFormInput = <T>(name: string) => {
  const { fields, formState, onChange } = useForm();

  const value = get(toJS(fields), name) as T | undefined;
  const fieldState = get(toJS(formState), name) as FieldState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return { value, handleChange, fieldState };
};
