import { Col, Row, Stack } from "react-bootstrap";
import { InputUser } from "@components/ui/form/InputUser";
import React from "react";

export const TrainFields = () => {
  return (
    <Stack gap={3}>
      <Row>
        <Col xs={12}>
          <InputUser
            name="participants"
            placeholder="Найти ученика"
            role="student"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <InputUser name="trainer" placeholder="Найти тренера" role="coach" />
        </Col>
      </Row>
    </Stack>
  );
};
