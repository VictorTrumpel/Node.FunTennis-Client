import {
  InputGroup as BaseInputGroup,
  FormControl,
  InputGroupProps as BaseInputGroupProps,
  Form,
  Form as BaseForm,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useFormInput } from "@hooks/useFormInput";
import { Visible } from "@components/common/Visible";
import React from "react";

type InputGroupProps = Omit<BaseInputGroupProps, "onChange"> & {
  name: string;
  startText?: string;
  endText?: string;
};

export const InputGroup = observer(
  ({ name, startText, endText, ...props }: InputGroupProps) => {
    const { handleChange, fieldState, defaultValue } = useFormInput(name);

    return (
      <Form.Group>
        <BaseInputGroup {...props}>
          <Visible condition={!!startText}>
            <BaseInputGroup.Text>{startText}</BaseInputGroup.Text>
          </Visible>
          <FormControl
            defaultValue={defaultValue}
            isInvalid={fieldState.isError}
            onChange={handleChange}
          />
          <Visible condition={!!endText}>
            <BaseInputGroup.Text>{endText}</BaseInputGroup.Text>
          </Visible>
        </BaseInputGroup>
        <BaseForm.Control.Feedback type="invalid">
          {fieldState.errMessage}
        </BaseForm.Control.Feedback>
      </Form.Group>
    );
  }
);
