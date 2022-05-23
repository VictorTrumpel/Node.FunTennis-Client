import {
  Form as BaseForm,
  FormControlProps,
  FloatingLabel,
} from "react-bootstrap";
import React from "react";
import { observer } from "mobx-react-lite";
import { useFormInput } from "@hooks/useFormInput";

type InputProps = Omit<FormControlProps, "onChange"> & {
  name: string;
};

export const Input = observer(({ name, placeholder, ...props }: InputProps) => {
  const { value, handleChange, fieldState } = useFormInput<string>(name);

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
