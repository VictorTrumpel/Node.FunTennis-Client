import { Form as BaseForm, FormProps as BaseFormProps } from "react-bootstrap";
import React, { createContext, FormEvent, ReactNode, useContext } from "react";
import { BaseForm as BaseFormClass } from "@store/BaseForm";
import { SendingStatus } from "@components/ui/form/Form/SendingStatus";

type FormProps<FieldsMap extends Record<string, any> = Record<string, any>> =
  Omit<BaseFormProps, "onSubmit"> & {
    children: ReactNode;
    defaultValues?: FieldsMap;
    form: BaseFormClass;
  };

type FormContextType = {
  form: BaseFormClass;
  defaultValues: Record<string, any>;
};

const FormContext = createContext<null | FormContextType>(null);

export function Form<FieldsMap>({
  children,
  defaultValues,
  form,
  ...props
}: FormProps<FieldsMap>) {
  const handleEventSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await form.submit();
  };

  return (
    <FormContext.Provider value={{ form, defaultValues: defaultValues || {} }}>
      <BaseForm onSubmit={handleEventSubmit} autoComplete="off" {...props}>
        {children}
        <SendingStatus />
      </BaseForm>
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const formContext = useContext(FormContext);

  if (!formContext) throw new Error("FormContext Provider is missing!");

  const { form, defaultValues } = formContext;

  const onChange = form.onChange.bind(form);

  return { ...form, onChange, defaultValues };
};
