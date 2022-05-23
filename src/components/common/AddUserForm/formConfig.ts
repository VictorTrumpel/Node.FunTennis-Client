import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";

type AuthFormFieldsMap = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
};

type AuthFormState = {
  username: FieldState;
  password: FieldState;
  fullName: FieldState;
  email: FieldState;
  phone: FieldState;
};

const formState: AuthFormState = {
  username: { isError: false },
  password: { isError: false },
  fullName: { isError: false },
  email: { isError: false },
  phone: { isError: false },
};

const fieldsMap: AuthFormFieldsMap = {
  username: "",
  password: "",
  fullName: "",
  email: "",
  phone: "",
};

const schemaShape = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  fullName: yup.string().nullable(),
  email: yup.string().nullable(),
  phone: yup.string().required(),
});

export const initAddUserForm = () =>
  new BaseForm<AuthFormFieldsMap, AuthFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/signup"
  );
