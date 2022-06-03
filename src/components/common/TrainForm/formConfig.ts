import { FieldState } from "@store/BaseForm/@types";
import * as yup from "yup";
import { BaseForm } from "@store/BaseForm";
import { TrainInfo } from "@api/TrainApi";

type TrainFormFieldsMap = Omit<TrainInfo, "_id">;

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

export const initAddTrainForm = () =>
  new BaseForm<TrainFormFieldsMap, TrainFormState>(
    fieldsMap,
    formState,
    schemaShape,
    "/train"
  );

export const initEditTrainForm = (request: string) =>
  new BaseForm<TrainFormFieldsMap, TrainFormState>(
    fieldsMap,
    formState,
    schemaShape,
    request
  );
