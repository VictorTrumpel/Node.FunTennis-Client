import { Container } from "react-bootstrap";
import { AddTrainForm } from "@components/common/TrainForm/AddTrainForm";

export const AddTrainPage = () => {
  return (
    <Container fluid className="paper">
      <AddTrainForm />
    </Container>
  );
};
