import { Container } from "react-bootstrap";
import { AddUserForm } from "@components/common/AddUserForm";

export const AddUserPage = () => {
  return (
    <Container fluid className="paper">
      <AddUserForm />
    </Container>
  );
};
