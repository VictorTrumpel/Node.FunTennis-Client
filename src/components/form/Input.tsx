import { Form as BaseForm, FormControlProps } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { useForm } from "./Form";
import get from "lodash.get";
import { FieldState } from "../../store/BaseForm/@types";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

type InputProps = Omit<FormControlProps, "onChange"> & {
  name: string;
};

export const Input = observer(({ name, ...props }: InputProps) => {
  const { fields, formState, onChange } = useForm();

  const value = get(toJS(fields), name) as string | undefined;
  const fieldState = get(toJS(formState), name) as FieldState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <BaseForm.Control
      type="text"
      value={value}
      isInvalid={fieldState.isError}
      onChange={handleChange}
      {...props}
    />
  );
});
