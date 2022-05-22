import { Container } from "react-bootstrap";
import { AuthForm } from "@components/common/AuthForm";

export const AuthPage = () => {
  return (
    <Container fluid className="auth-page_container">
      <AuthForm />
    </Container>
  );
};
