import React from "react";
import { observer } from "mobx-react-lite";
import { useFormInput } from "@hooks/useFormInput";
import { ModelInput, ModelInputProps } from "@components/ui/form/ModelInput";

type InputProps = Omit<ModelInputProps, "onChange"> & {
  name: string;
  maxLength?: number;
};

export const Input = observer(({ name, ...props }: InputProps) => {
  const { handleChange, fieldState, defaultValue } = useFormInput(name);

  return (
    <ModelInput
      onChange={handleChange}
      fieldState={fieldState}
      defaultValue={defaultValue}
      {...props}
    />
  );
});
