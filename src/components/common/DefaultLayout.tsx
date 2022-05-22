import React, { ReactNode } from "react";
import { Container, Navbar, Button, Stack } from "react-bootstrap";
import { user } from "@store/User";
import { MainMenu } from "@components/common/MainMenu";
import { useNavigate } from "react-router-dom";

type DefaultLayoutProps = {
  children?: ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await user.logout();
    navigate("/");
  };

  return (
    <Stack className="app-main-stack" gap={3}>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo3.png"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            FUN TENNIS
          </Navbar.Brand>
          <Button onClick={handleLogout}>Выйти</Button>
        </Container>
      </Navbar>
      <Container className="default-layout_container">
        <Stack gap={3} direction="horizontal">
          <MainMenu />
          {children}
        </Stack>
      </Container>
    </Stack>
  );
};
