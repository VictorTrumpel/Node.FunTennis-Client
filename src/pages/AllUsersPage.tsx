import { Container } from "react-bootstrap";
import { UsersOverview } from "@components/common/UsersOverview";

export const AllUsersPage = () => {
  return (
    <Container fluid className="paper">
      <UsersOverview />
    </Container>
  );
};
