import { Button } from "react-bootstrap";
import { Form } from "@components/ui/form/Form";
import { initAddUserForm } from "./formConfig";
import { useState } from "react";

import { UserFields } from "@components/common/UserForms/UserFields";

export const AddUserForm = () => {
  const [addUserForm] = useState(initAddUserForm);

  return (
    <Form form={addUserForm} autoComplete="off">
      <UserFields />
      <div className="mt-3 d-flex justify-content-end">
        <Button type="submit" variant="outline-primary">
          Добавить участника
        </Button>
      </div>
    </Form>
  );
};
