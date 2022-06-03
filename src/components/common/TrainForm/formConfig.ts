import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";

type TrainFormFieldsMap = {
  participants: string[];
  trainer: string[];
  date: Date | null;
  info: string;
};

type TrainFormState = Record<keyof TrainFormFieldsMap, FieldState>;

const formState: TrainFormState = {
  participants: { isError: false },
  trainer: { isError: false },
  date: { isError: false },
  info: { isError: false },
};

const fieldsMap: TrainFormFieldsMap = {
  participants: [],
  trainer: [],
  date: null,
  info: "",
};

const schemaShape = yup.object().shape({
  participants: yup.array().required().min(1),
  trainer: yup.array().required().min(1),
  date: yup.date().required(),
  info: yup.string().nullable(),
});

export const initTrainForm = () =>
  new BaseForm<TrainFormFieldsMap, TrainFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/train"
  );
