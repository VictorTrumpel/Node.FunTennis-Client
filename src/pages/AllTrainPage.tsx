import { Container } from "react-bootstrap";
import { TrainOverview } from "@components/common/TrainOverview";

export const AllTrainPage = () => {
  return (
    <Container fluid className="paper">
      <TrainOverview />
    </Container>
  );
};
