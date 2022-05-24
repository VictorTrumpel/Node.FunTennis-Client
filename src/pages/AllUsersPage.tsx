import { Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "@api/api";
import { UserInfo } from "@store/User/@types";
import { useNavigate } from "react-router-dom";

export const AllUsersPage = () => {
  const [users, setUsers] = useState<UserInfo[] | null>(null);
  const navigate = useNavigate();

  const handleClickUser = (id?: string) => {
    navigate(`/users/${id}`);
  };

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
        <Alert
          key={user?._id}
          variant="secondary"
          onClick={handleClickUser.bind(null, user?._id)}
        >
          {user?.username}
        </Alert>
      ))}
    </Container>
  );
};
