import { BaseForm } from "./BaseForm";
import * as yup from "yup";
import { FieldState } from "./BaseForm/@types";

type AuthFormFieldsMap = {
  username: string;
  password: string;
  userData: {
    firstName: string;
    lastName: string;
  };
};

type AuthFormState = {
  username: FieldState;
  password: FieldState;
  userData: {
    firstName: FieldState;
    lastName: FieldState;
  };
};

const formState: AuthFormState = {
  username: { isError: false },
  password: { isError: false },
  userData: {
    firstName: { isError: false },
    lastName: { isError: false },
  },
};

const fieldsMap: AuthFormFieldsMap = {
  username: "",
  password: "",
  userData: {
    firstName: "",
    lastName: "",
  },
};

const schemaShape = yup.object().shape({
  username: yup.string().required().length(5),
  password: yup.string().required(),
  userData: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  }),
});

export const form = new BaseForm<AuthFormFieldsMap, AuthFormState>(
  fieldsMap,
  formState,
  schemaShape
);
