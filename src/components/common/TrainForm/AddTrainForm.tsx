import { Form } from "@components/ui/form/Form";
import React, { useState } from "react";
import { initAddTrainForm } from "@components/common/TrainForm/formConfig";
import { TrainFields } from "@components/common/TrainForm/TrainFields";
import { Button } from "react-bootstrap";

export const AddTrainForm = () => {
  const [trainForm] = useState(initAddTrainForm);

  return (
    <Form form={trainForm} defaultValues={null} autoComplete="off">
      <TrainFields />

      <div className="mt-3 d-flex justify-content-end">
        <Button type="submit" variant="outline-primary">
          Добавить тренировку
        </Button>
      </div>
    </Form>
  );
};
