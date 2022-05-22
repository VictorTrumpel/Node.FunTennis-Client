import { BaseForm } from "./BaseForm";
import * as yup from "yup";
import { FieldState } from "./BaseForm/@types";

type AuthFormFieldsMap = {
  username: string;
  password: string;
};

type AuthFormState = {
  username: FieldState;
  password: FieldState;
};

const formState: AuthFormState = {
  username: { isError: false },
  password: { isError: false },
};

const fieldsMap: AuthFormFieldsMap = {
  username: "",
  password: "",
};

const schemaShape = yup.object().shape({
  username: yup.string().required().length(5),
  password: yup.string().required(),
});

export const authForm = new BaseForm<AuthFormFieldsMap, AuthFormState>(
  fieldsMap,
  formState,
  schemaShape,
  "/login"
);
