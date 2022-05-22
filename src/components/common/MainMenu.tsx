import { Nav } from "react-bootstrap";
import { mainMenu } from "@store/MainMenu";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const MainMenu = observer(() => {
  const navigate = useNavigate();
  const match = useMatch("/:page/*");

  const handleNavigate = (url: string) => {
    navigate(url);
    mainMenu.activeTab = url;
  };

  useEffect(() => {
    mainMenu.activeTab = match?.pathnameBase || "";
  }, []);

  return (
    <Nav activeKey={mainMenu.activeTab} variant="pills" className="main-menu">
      {mainMenu.menuItems.map(({ url, label }) => (
        <Nav.Link
          key={url}
          onClick={handleNavigate.bind(null, url)}
          eventKey={url}
        >
          {label}
        </Nav.Link>
      ))}
    </Nav>
  );
});
