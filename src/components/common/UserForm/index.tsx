import { Button, Row, Col, Stack } from "react-bootstrap";
import { Input } from "@components/ui/form/Input";
import { Form } from "@components/ui/form/Form";
import { initAddUserForm } from "./formConfig";
import { useState } from "react";
import { InputAvatar } from "@components/ui/form/InputAvatar";
import { InputGroup } from "@components/ui/form/InputGroup";
import { InputSelect } from "@components/ui/form/InputSelect";
import {
  genderOptions,
  levelOptions,
  roleOptions,
} from "@components/common/UserForm/formData";
import { InputCheck } from "@components/ui/form/InputCheck";

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
              <Input name="fullName" maxLength={100} placeholder="Полное имя" />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Input name="username" maxLength={20} placeholder="Логин" />
            </Col>
            <Col xs={6}>
              <Input
                type="password"
                name="password"
                maxLength={100}
                placeholder="Пароль"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h5>Контакты</h5>
            </Col>
            <Col xs={6}>
              <Input
                type="email"
                name="email"
                maxLength={100}
                placeholder="Почта"
              />
            </Col>
            <Col xs={6}>
              <Input
                type="phone"
                name="phone"
                maxLength={20}
                placeholder="Номер телефона"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h5>Общие данные</h5>
            </Col>
            <Col xs={6}>
              <Input
                style={{ minHeight: "133px", maxHeight: "200px" }}
                type="text"
                as="textarea"
                name="description"
                maxLength={250}
                placeholder="Информация"
              />
            </Col>
            <Col xs={6}>
              <Stack gap={3}>
                <Stack
                  direction="horizontal"
                  gap={3}
                  className="justify-content-between"
                >
                  <InputCheck
                    name="gender"
                    options={genderOptions}
                    type="radio"
                  />
                  <InputSelect
                    name="role"
                    placeholder="Роль"
                    options={roleOptions}
                  />
                </Stack>

                <InputSelect
                  name="level"
                  placeholder="Уровень"
                  options={levelOptions}
                />
              </Stack>
            </Col>
          </Row>
        </Stack>
      </Stack>
      <div className="mt-3 d-flex justify-content-end">
        <Button type="submit" variant="outline-primary">
          Добавить участника
        </Button>
      </div>
    </Form>
  );
};