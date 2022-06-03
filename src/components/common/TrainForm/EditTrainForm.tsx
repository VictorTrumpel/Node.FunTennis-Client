import { Form } from "@components/ui/form/Form";
import { Button } from "react-bootstrap";
import { TrainFields } from "@components/common/TrainForm/TrainFields";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEditForm } from "@hooks/useEditForm";
import { LoadingPage } from "@components/common/LoadingPage";
import { trainApi, TrainInfo } from "@api/TrainApi";
import { initEditTrainForm } from "@components/common/TrainForm/formConfig";

export const EditTrainForm = () => {
  const navigate = useNavigate();
  const { params } = useMatch("/train/:id") || {};
  const [editTrainForm] = useState(
    initEditTrainForm.bind(null, `/train/${params?.id || ""}`)
  );

  const { defaultValues, isLoading } = useEditForm<TrainInfo>(
    editTrainForm,
    trainApi.getTrain.bind(trainApi, params?.id || ""),
    (fields) => ({ ...fields })
  );

  if (isLoading) return <LoadingPage />;

  return (
    <Form form={editTrainForm} defaultValues={defaultValues} autoComplete="off">
      <TrainFields readonly />
      <div className="mt-3 d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    </Form>
  );
};
