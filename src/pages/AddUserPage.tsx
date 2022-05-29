import { Container } from "react-bootstrap";
import { AddUserForm } from "@components/common/UserForm/AddUserFrom";

export const AddUserPage = () => {
  return (
    <Container fluid className="paper">
      <AddUserForm />
    </Container>
  );
};
