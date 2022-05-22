import { useForm } from "@components/ui/form/Form/index";
import { Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";

export const SendingStatus = observer(() => {
  const { sendingStatus } = useForm();

  if (!sendingStatus) return <></>;
  if (!sendingStatus.message) return <></>;

  return (
    <Form.Control.Feedback
      style={{ display: "block" }}
      type={sendingStatus.isSuccess ? "valid" : "invalid"}
    >
      {sendingStatus.message}
    </Form.Control.Feedback>
  );
});
