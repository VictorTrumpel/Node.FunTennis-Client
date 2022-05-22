import { Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "@api/api";
import { UserInfo } from "@store/User/@types";

export const AllUsersPage = () => {
  const [users, setUsers] = useState<UserInfo[] | null>(null);

  useEffect(() => {
    api
      .get<UserInfo[]>("/users")
      .then((users) => {
        setUsers(users.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container fluid className="paper">
      {users?.map((user) => (
        <Alert key={user?._id} variant="secondary">
          {user?.username}
        </Alert>
      ))}
    </Container>
  );
};
