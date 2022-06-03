import { TrainInfo } from "@api/TrainApi";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type TrainTabProps = {
  trainInfo: TrainInfo;
};

export const TrainTab = ({ trainInfo }: TrainTabProps) => {
  const navigate = useNavigate();

  const handleClickUser = () => {
    navigate(`/train/${trainInfo?._id}`);
  };
  return (
    <Alert variant="secondary" draggable={true} onClick={handleClickUser}>
      {trainInfo.info}
    </Alert>
  );
};
