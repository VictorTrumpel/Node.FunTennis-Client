import { Alert } from "react-bootstrap";
import { UserInfo } from "@store/User/@types";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

type UserTabProps = {
  userInfo?: UserInfo;
};

export const UserTab = ({ userInfo }: UserTabProps) => {
  const navigate = useNavigate();

  const handleClickUser = () => {
    navigate(`/users/${userInfo?._id}`);
  };

  if (!userInfo) return <Fragment />;
  if (userInfo?.username === "admin") return <Fragment />;

  return (
    <Alert variant="secondary" onClick={handleClickUser} draggable={true}>
      {userInfo?.fullName}
    </Alert>
  );
};
