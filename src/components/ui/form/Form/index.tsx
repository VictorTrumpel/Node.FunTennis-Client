import { Form as BaseForm, FormProps as BaseFormProps } from "react-bootstrap";
import React, { createContext, FormEvent, ReactNode, useContext } from "react";
import { BaseForm as BaseFormClass } from "@store/form/BaseForm";
import { SendingStatus } from "@components/ui/form/Form/SendingStatus";

type FormProps = Omit<BaseFormProps, "onSubmit"> & {
  children: ReactNode;
  form: BaseFormClass;
};

const FormContext = createContext<null | BaseFormClass>(null);

export const Form = ({ children, form, ...props }: FormProps) => {
  const handleEventSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await form.submit();
  };

  return (
    <FormContext.Provider value={form}>
      <BaseForm onSubmit={handleEventSubmit} autoComplete="off" {...props}>
        {children}
        <SendingStatus />
      </BaseForm>
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const formContext = useContext(FormContext);

  if (!formContext) throw new Error("FormContext Provider is missing!");

  const onChange = formContext.onChange.bind(formContext);

  return { ...formContext, onChange };
};
