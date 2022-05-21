import React from "react";
import "./App.scss";
import { Form } from "./components/form/Form";
import { form } from "./store/AuthForm";
import { Input } from "./components/form/Input";
import { Button } from "react-bootstrap";

const AuthForm = () => (
  <Form form={form} onSubmit={form.submit.bind(form)} autoComplete="off">
    <Input name="username" placeholder="Логин" />
    <Input name="password" placeholder="Пароль" />
    <Button type="submit">Войти</Button>
  </Form>
);

const App = () => {
  return (
    <div className="App">
      <h1>HEADER</h1>
      <AuthForm />
    </div>
  );
};

export default App;
