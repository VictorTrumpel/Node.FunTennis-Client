import { Button, Row, Col } from "react-bootstrap";
import { Input } from "@components/ui/form/Input";
import { Form } from "@components/ui/form/Form";
import { initAddUserForm } from "./formConfig";
import { useState } from "react";

export const AddUserForm = () => {
  const [addUserForm] = useState(initAddUserForm);

  return (
    <Form form={addUserForm} autoComplete="off">
      <Row>
        <Col xs={12} md={6}>
          <Input name="username" placeholder="Логин" />
        </Col>
        <Col xs={12} md={6}>
          <Input type="password" name="password" placeholder="Пароль" />
        </Col>
      </Row>
      <Button type="submit" variant="outline-primary" className="mt-3">
        Добавить участника
      </Button>
    </Form>
  );
};
