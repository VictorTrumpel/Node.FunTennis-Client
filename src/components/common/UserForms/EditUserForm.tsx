import { Form } from "@components/ui/form/Form";
import { UserFields } from "@components/common/UserForms/UserFields";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { initUserForm } from "@components/common/UserForms/formConfig";
import { useMatch, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { UserApi } from "@api/UserApi";
import { UserInfo } from "@store/User/@types";

export const EditUserForm = observer(() => {
  const [defaultValues, setDefaultValues] = useState<UserInfo | null>(null);
  const { params } = useMatch("/users/:id") || {};
  const navigate = useNavigate();
  const [editUserForm] = useState(initUserForm);

  useEffect(() => {
    (async () => {
      const userInfo = await new UserApi().getUser(params?.id || "");
      if (!userInfo) return;
      editUserForm.resetFieldsMap({ ...userInfo, password: "fakepass" });
      setDefaultValues({ ...userInfo, password: "fakepass" });
    })();
  }, []);

  return (
    <Form
      form={editUserForm}
      defaultValues={defaultValues || {}}
      autoComplete="off"
    >
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
});
