import React from "react";
import { Button } from "react-bootstrap";
import "./App.scss";
import { observer } from "mobx-react-lite";
import { Form } from "./components/form/Form";
import { authForm } from "./store/AuthForm";
import { Input } from "./components/form/Input";

const onChange = authForm.onChange.bind(authForm);
const submit = authForm.submit.bind(authForm);

const App = observer(() => {
  const { username, password } = authForm;

  return (
    <div className="App">
      <Form onSubmit={submit} autoComplete="off">
        <Input
          value={username}
          placeholder="Логин"
          onChange={onChange.bind(null, "username")}
        />
        <Input
          value={password}
          placeholder="Пароль"
          onChange={onChange.bind(null, "password")}
        />
        <Button type="submit">Войти</Button>
      </Form>
    </div>
  );
});

export default App;
