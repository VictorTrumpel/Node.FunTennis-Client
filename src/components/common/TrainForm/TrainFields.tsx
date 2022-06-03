import { Col, Row, Stack } from "react-bootstrap";
import { InputUser } from "@components/ui/form/InputUser";
import React from "react";
import { Input } from "@components/ui/form/Input";

export const TrainFields = () => {
  return (
    <Stack gap={3}>
      <h5>Данные о тренировке:</h5>
      <Row>
        <Col xs={12} md={4}>
          <Input type="date" name="date" placeholder="Дата" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <InputUser
            name="participants"
            placeholder="Выбрать ученика"
            role="student"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <InputUser
            name="trainer"
            placeholder="Выбрать тренера"
            role="coach"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Input
            style={{ minHeight: "133px", maxHeight: "200px" }}
            as="textarea"
            name="info"
            maxLength={250}
            placeholder="Информация о тренировке"
          />
        </Col>
      </Row>
    </Stack>
  );
};
