import { Spinner } from "react-bootstrap";

export const LoadingPage = () => {
  return (
    <div className="d-flex h-100 w-100 justify-content-center align-items-center">
      <Spinner animation="border" />
    </div>
  );
};
