import { FormCheckProps, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { useFormInput } from "@hooks/useFormInput";

type InputCheckProps = Omit<FormCheckProps, "onChange"> & {
  name: string;
  options: InputSelectOption[];
};

export const InputCheck = ({ options, ...props }: InputCheckProps) => {
  return (
    <Form.Group style={{ minHeight: "58px" }}>
      {options.map((option) => {
        return (
          <InputCheckOption key={`${option.value}`} {...props} {...option} />
        );
      })}
    </Form.Group>
  );
};

type InputCheckOptionProps = Omit<InputCheckProps, "options">;

const InputCheckOption = observer(
  ({ value, name, ...props }: InputCheckOptionProps) => {
    const { handleChange, fieldState, defaultValue } = useFormInput(name);

    return (
      <Form.Check
        {...props}
        defaultChecked={value === defaultValue}
        isInvalid={fieldState.isError}
        onChange={handleChange}
      />
    );
  }
);
