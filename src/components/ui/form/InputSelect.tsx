import {
  FormSelectProps,
  FloatingLabel,
  Form,
  Form as BaseForm,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useFormInput } from "@hooks/useFormInput";
import React from "react";

export type InputSelectOption = {
  label: string;
  value: string;
};

type InputSelectProps = Omit<FormSelectProps, "onChange"> & {
  name: string;
  options: InputSelectOption[];
};

export const InputSelect = observer(
  ({ name, options, placeholder }: InputSelectProps) => {
    const { handleSelect, fieldState } = useFormInput(name);

    return (
      <Form.Group>
        <FloatingLabel label={placeholder || name}>
          <Form.Select isInvalid={fieldState.isError} onChange={handleSelect}>
            <option value="">не выбрано</option>
            {options.map(({ label, value }) => (
              <option key={`${label}-${value}`} value={value}>
                {label}
              </option>
            ))}
          </Form.Select>
          <BaseForm.Control.Feedback type="invalid">
            {fieldState.errMessage}
          </BaseForm.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    );
  }
);
