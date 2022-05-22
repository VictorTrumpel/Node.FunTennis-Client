import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";
import { reaction } from "mobx";
import { user } from "@store/User";

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

export const initAuthForm = () =>
  new BaseForm<AuthFormFieldsMap, AuthFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/login"
  );

export const useAuthFormReaction = (authForm: BaseForm) =>
  reaction(
    () => authForm.sendingStatus,
    async () => {
      if (authForm?.sendingStatus?.isSuccess) {
        await user.auth();
      }
    }
  );
