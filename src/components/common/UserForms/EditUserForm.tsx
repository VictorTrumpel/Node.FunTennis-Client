import { Form } from "@components/ui/form/Form";
import { UserFields } from "@components/common/UserForms/UserFields";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { initEditUserForm } from "@components/common/UserForms/formConfig";
import { useMatch, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userApi } from "@api/UserApi";
import { useEditForm } from "@hooks/useEditForm";
import { UserInfo } from "@store/User/@types";
import { LoadingPage } from "@components/common/LoadingPage";

export const EditUserForm = observer(() => {
  const navigate = useNavigate();
  const { params } = useMatch("/users/:id") || {};
  const [editUserForm] = useState(
    initEditUserForm.bind(null, `/users/${params?.id || ""}`)
  );
  const { defaultValues, isLoading } = useEditForm<UserInfo>(
    editUserForm,
    userApi.getUser.bind(userApi, params?.id || ""),
    (fields) => ({ ...fields, password: "fakePass" })
  );

  if (isLoading) return <LoadingPage />;

  return (
    <Form form={editUserForm} defaultValues={defaultValues} autoComplete="off">
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
