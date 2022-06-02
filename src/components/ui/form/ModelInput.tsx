import {
  FloatingLabel,
  Form as BaseForm,
  FormControlProps,
} from "react-bootstrap";
import React, { ReactNode } from "react";
import { FieldState } from "@store/BaseForm/@types";
import { Visible } from "@components/common/Visible";
import classNames from "classnames";

export type ModelInputProps = FormControlProps & {
  maxLength?: number;
  fieldState?: FieldState;
  endAdornment?: () => ReactNode;
  list?: string;
};

export const ModelInput = ({
  placeholder,
  fieldState,
  onChange,
  className,
  endAdornment,
  ...props
}: ModelInputProps) => {
  return (
    <BaseForm.Group className={classNames("model-input", className)}>
      <FloatingLabel label={placeholder}>
        <BaseForm.Control
          type="text"
          placeholder={placeholder}
          isInvalid={fieldState?.isError}
          onChange={onChange}
          {...props}
        />
        <BaseForm.Control.Feedback type="invalid">
          {fieldState?.errMessage}
        </BaseForm.Control.Feedback>
        <Visible condition={!!endAdornment}>
          <div className="model-input_end-adornment">{endAdornment?.()}</div>
        </Visible>
      </FloatingLabel>
    </BaseForm.Group>
  );
};
