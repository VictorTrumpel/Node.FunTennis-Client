import { Button, Row, Col, Stack } from "react-bootstrap";
import { Input } from "@components/ui/form/Input";
import { Form } from "@components/ui/form/Form";
import { initAddUserForm } from "./formConfig";
import { useState } from "react";
import { InputAvatar } from "@components/ui/form/InputAvatar";
import { InputGroup } from "@components/ui/form/InputGroup";

export const AddUserForm = () => {
  const [addUserForm] = useState(initAddUserForm);

  return (
    <Form form={addUserForm} autoComplete="off">
      <Stack direction="horizontal" gap={3}>
        <div className="avatar-block">
          <InputAvatar />
          <InputGroup name="balance" startText="₽" />
        </div>

        <Stack className="flex-grow-1" gap={3}>
          <Row>
            <Col xs={12}>
              <Input name="fullName" placeholder="Полное имя" />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Input name="username" placeholder="Логин" />
            </Col>
            <Col xs={6}>
              <Input type="password" name="password" placeholder="Пароль" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h5>Контакты</h5>
            </Col>
            <Col xs={6}>
              <Input type="email" name="email" placeholder="Почта" />
            </Col>
            <Col xs={6}>
              <Input type="phone" name="phone" placeholder="Номер телефона" />
            </Col>
          </Row>
        </Stack>
      </Stack>
      <Button type="submit" variant="outline-primary" className="mt-3">
        Добавить участника
      </Button>
    </Form>
  );
};
