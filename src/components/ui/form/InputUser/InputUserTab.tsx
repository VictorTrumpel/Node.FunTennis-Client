import { useEffect, useState } from "react";
import { UserInfo } from "@store/User/@types";
import { userApi } from "@api/UserApi";
import { CloseButton } from "react-bootstrap";

type InputUserTabProps = {
  userId: string;
  onDelete: (id: string) => void;
};

export const InputUserTab = ({ userId, onDelete }: InputUserTabProps) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    (async () => {
      const userRes = await userApi.getUser(userId);
      if (userRes) {
        setUser(userRes);
      }
    })();
  }, [userId]);

  if (!user) return <></>;

  return (
    <li className="d-flex align-items-center">
      <span>{user.fullName}</span>{" "}
      <CloseButton onClick={onDelete.bind(null, userId)} />
    </li>
  );
};
