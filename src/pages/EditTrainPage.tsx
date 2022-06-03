import { Container } from "react-bootstrap";
import { EditTrainForm } from "@components/common/TrainForm/EditTrainForm";

export const EditTrainPage = () => {
  return (
    <Container fluid className="paper">
      <EditTrainForm />
    </Container>
  );
};
