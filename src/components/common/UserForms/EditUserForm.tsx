import { Form } from "@components/ui/form/Form";
import { UserFields } from "@components/common/UserForms/UserFields";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { initAddUserForm } from "@components/common/UserForms/formConfig";
import { useNavigate } from "react-router-dom";

export const EditUserForm = () => {
  const navigate = useNavigate();
  const [addUserForm] = useState(initAddUserForm);

  return (
    <Form form={addUserForm} autoComplete="off">
      <UserFields />
      <div className="mt-3 d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button type="submit" variant="outline-primary">
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
