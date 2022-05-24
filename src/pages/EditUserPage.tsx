import { Container } from "react-bootstrap";
import { EditUserForm } from "@components/common/UserForms/EditUserForm";

export const EditUserPage = () => {
  return (
    <Container fluid className="paper">
      <EditUserForm />
    </Container>
  );
};
