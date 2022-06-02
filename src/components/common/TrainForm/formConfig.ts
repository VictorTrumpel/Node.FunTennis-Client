import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";

type TrainFormFieldsMap = {
  participants: string[];
  trainer: string[];
};

type TrainFormState = Record<keyof TrainFormFieldsMap, FieldState>;

const formState: TrainFormState = {
  participants: { isError: false },
  trainer: { isError: false },
};

const fieldsMap: TrainFormFieldsMap = {
  participants: [],
  trainer: [],
};

const schemaShape = yup.object().shape({
  participants: yup.array().required(),
  trainer: yup.array().required(),
});

export const initTrainForm = () =>
  new BaseForm<TrainFormFieldsMap, TrainFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/train"
  );
