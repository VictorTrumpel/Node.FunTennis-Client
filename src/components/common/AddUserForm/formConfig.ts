import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";

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
  username: yup.string().required(),
  password: yup.string().required(),
});

export const initAddUserForm = () =>
  new BaseForm<AuthFormFieldsMap, AuthFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/signup"
  );
