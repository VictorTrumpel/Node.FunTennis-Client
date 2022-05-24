import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";

type AuthFormFieldsMap = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  description: string;
  level: number | null;
  balance: number;
  gender: "M" | "Ж" | null;
  role: "student" | "coach" | null;
};

type AuthFormState = {
  username: FieldState;
  password: FieldState;
  fullName: FieldState;
  email: FieldState;
  phone: FieldState;
  description: FieldState;
  level: FieldState;
  balance: FieldState;
  gender: FieldState;
  role: FieldState;
};

const formState: AuthFormState = {
  username: { isError: false },
  password: { isError: false },
  fullName: { isError: false },
  email: { isError: false },
  phone: { isError: false },
  description: { isError: false },
  level: { isError: false },
  balance: { isError: false },
  gender: { isError: false },
  role: { isError: false },
};

const fieldsMap: AuthFormFieldsMap = {
  username: "",
  password: "",
  fullName: "",
  email: "",
  phone: "",
  description: "",
  level: null,
  balance: 0,
  gender: null,
  role: null,
};

const schemaShape = yup.object().shape({
  username: yup.string().required().max(20),
  password: yup.string().required().max(100),
  fullName: yup.string().required().max(100),
  email: yup.string().nullable().max(100),
  phone: yup.string().required().max(20),
  description: yup.string().nullable().max(250),
  level: yup.number().required(),
  balance: yup.number().nullable(),
  gender: yup
    .string()
    .required()
    .test((value) => ["М", "Ж"].includes(value as string)),
  role: yup.string().required(),
});

export const initAddUserForm = () =>
  new BaseForm<AuthFormFieldsMap, AuthFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/signup"
  );
