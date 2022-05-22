import React from "react";
import { Spinner } from "react-bootstrap";
import { AuthPage } from "@pages/AuthPage";
import { observer } from "mobx-react-lite";
import { user } from "@store/User";

(async () => {
  await user.auth();
})();

const App = observer(() => {
  if (user.isPendingAuth) return <Spinner animation="border" size="sm" />;
  if (!user.isAuthorized) return <AuthPage />;

  return <div>Pages</div>;
});

export default App;
