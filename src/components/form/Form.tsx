import { Form as BaseForm, FormProps as BaseFormProps } from "react-bootstrap";
import { createContext, FormEvent, ReactNode, useContext } from "react";
import { BaseForm as BaseFormClass } from "../../store/BaseForm";

type FormProps = Omit<BaseFormProps, "onSubmit"> & {
  onSubmit: () => void;
  children: ReactNode;
  form: BaseFormClass;
};

const FormContext = createContext<null | BaseFormClass>(null);

export const Form = ({ children, form, onSubmit, ...props }: FormProps) => {
  const handleEventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContext.Provider value={form}>
      <BaseForm onSubmit={handleEventSubmit} autoComplete="off" {...props}>
        {children}
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
