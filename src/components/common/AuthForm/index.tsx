import { Form } from "@components/ui/form/Form";
import { Button, Stack } from "react-bootstrap";
import { Input } from "@components/ui/form/Input";
import React, { useState } from "react";
import {
  initAuthForm,
  useAuthFormReaction,
} from "@components/common/AuthForm/formConfig";

export const AuthForm = () => {
  const [authForm] = useState(initAuthForm);
  useAuthFormReaction(authForm);

  return (
    <div className="auth-from_container">
      <h5 className="title">Войдите в систему</h5>
      <Form form={authForm} autoComplete="off">
        <Stack gap={3}>
          <Input name="username" placeholder="Логин" />
          <Input type="password" name="password" placeholder="Пароль" />
          <Button type="submit" variant="outline-primary">
            Войти
          </Button>
        </Stack>
      </Form>
    </div>
  );
};
