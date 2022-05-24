import React from "react";
import { Spinner } from "react-bootstrap";
import { AuthPage } from "@pages/AuthPage";
import { observer } from "mobx-react-lite";
import { user } from "@store/User";
import { DefaultLayout } from "@components/common/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddUserPage } from "@pages/AddUserPage";
import { AllUsersPage } from "@pages/AllUsersPage";
import { EditUserPage } from "@pages/EditUserPage";

(async () => {
  await user.auth();
})();

const App = observer(() => {
  if (user.isPendingAuth) return <Spinner animation="border" size="sm" />;
  if (!user.isAuthorized) return <AuthPage />;

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/">
            <Route path="main" element={<div>ГЛАВНАЯ</div>} />
            <Route path="add" element={<AddUserPage />} />
            <Route path="users" element={<AllUsersPage />} />
            <Route path="users/:id" element={<EditUserPage />} />
          </Route>
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
});

export default App;
