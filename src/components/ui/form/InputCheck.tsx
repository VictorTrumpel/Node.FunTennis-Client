import { FormCheckProps, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { useFormInput } from "@hooks/useFormInput";

type InputCheckProps = Omit<FormCheckProps, "onChange"> & {
  name: string;
  options: InputSelectOption[];
};

export const InputCheck = observer(
  ({ name, options, inline, type }: InputCheckProps) => {
    const { handleChange, fieldState } = useFormInput(name);

    return (
      <Form.Group style={{ minHeight: "58px" }}>
        {options.map(({ value, label }) => (
          <Form.Check
            key={`${value}-${label}`}
            isInvalid={fieldState.isError}
            inline={inline}
            label={label}
            value={value}
            name={name}
            type={type}
            id={label}
            onChange={handleChange}
          />
        ))}
      </Form.Group>
    );
  }
);
