import { Form as BaseForm, FormControlProps } from "react-bootstrap";
import React, { ChangeEvent } from "react";

type InputProps = Omit<FormControlProps, "onChange"> & {
  onChange: (value: string) => void;
};

export const Input = ({ onChange, ...props }: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <BaseForm.Control type="text" onChange={handleChange} {...props} />;
};
