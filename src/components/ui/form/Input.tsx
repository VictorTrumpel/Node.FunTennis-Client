import get from "lodash.get";
import {
  Form as BaseForm,
  FormControlProps,
  FloatingLabel,
} from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { useForm } from "./Form";
import { FieldState } from "@store/form/BaseForm/@types";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

type InputProps = Omit<FormControlProps, "onChange"> & {
  name: string;
};

export const Input = observer(({ name, placeholder, ...props }: InputProps) => {
  const { fields, formState, onChange } = useForm();

  const value = get(toJS(fields), name) as string | undefined;
  const fieldState = get(toJS(formState), name) as FieldState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <BaseForm.Group>
      <FloatingLabel label={placeholder || name}>
        <BaseForm.Control
          type="text"
          value={value}
          placeholder={placeholder}
          isInvalid={fieldState.isError}
          onChange={handleChange}
          {...props}
        />
        <BaseForm.Control.Feedback type="invalid">
          {fieldState.errMessage}
        </BaseForm.Control.Feedback>
      </FloatingLabel>
    </BaseForm.Group>
  );
});
