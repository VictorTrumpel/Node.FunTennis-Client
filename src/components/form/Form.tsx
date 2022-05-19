import { Form as BaseForm, FormProps as BaseFormProps } from "react-bootstrap";
import { FormEvent, ReactNode } from "react";

type FormProps = Omit<BaseFormProps, "onSubmit"> & {
  onSubmit: () => void;
  children: ReactNode;
};

export const Form = ({ children, onSubmit, ...props }: FormProps) => {
  const handleEventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <BaseForm onSubmit={handleEventSubmit} autoComplete="off" {...props}>
      {children}
    </BaseForm>
  );
};
