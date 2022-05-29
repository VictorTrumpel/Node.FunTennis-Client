import { Button } from "react-bootstrap";
import { Form } from "@components/ui/form/Form";
import { initUserForm } from "./formConfig";
import { useState } from "react";

import { UserFields } from "@components/common/UserForm/UserFields";

export const AddUserForm = () => {
  const [addUserForm] = useState(initUserForm);

  return (
    <Form form={addUserForm} defaultValues={null} autoComplete="off">
      <UserFields />
      <div className="mt-3 d-flex justify-content-end">
        <Button type="submit" variant="outline-primary">
          Добавить участника
        </Button>
      </div>
    </Form>
  );
};
