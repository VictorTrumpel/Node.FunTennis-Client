import {
  BaseFieldsValuesMap,
  BaseFormState,
  FieldState,
  PrimitiveFieldValue,
  SendingStatus,
} from "./@types";
import { makeAutoObservable, toJS } from "mobx";
import update from "lodash.update";
import set from "lodash.set";
import get from "lodash.get";
import { AnySchema, ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";
import { applySchema, ErrorRec } from "@yup/applySchema";
import { api } from "@api/api";
import { AxiosError } from "axios";
import clonedeep from "lodash.clonedeep";

export class BaseForm<
  FieldsMap extends BaseFieldsValuesMap = BaseFieldsValuesMap,
  FormState extends BaseFormState = BaseFormState
> {
  sendingStatus: SendingStatus;
  isSending = false;
  submitCount = 0;

  constructor(
    public fieldsMap: FieldsMap,
    public formState: FormState,
    private readonly schema: ObjectSchema<ObjectShape>,
    private readonly request: string
  ) {
    makeAutoObservable(this);
    this.fieldsMap = fieldsMap;
    this.formState = formState;
    this.schema = schema;
    this.request = request;
  }

  private clearFieldError = (fieldsState: BaseFormState, fieldName: string) => {
    update(fieldsState, fieldName, (field: FieldState) => {
      field.isError = false;
      return field;
    });
  };

  private setFieldError(fieldsState: BaseFormState, error: ErrorRec) {
    const { errPath, errMessage } = error;
    update(fieldsState, errPath, (field: FieldState) => {
      field.isError = true;
      field.errMessage = errMessage;
      return field;
    });
  }

  resetFieldsMap(fields: FieldsMap) {
    this.fieldsMap = clonedeep(fields);
  }

  onChange(fieldName: string, value: PrimitiveFieldValue) {
    set(this.fieldsMap, fieldName, value);

    if (this.submitCount === 0) return;

    const fieldShape = get(this.schema.fields, fieldName) as
      | AnySchema
      | undefined;

    fieldShape?.isValid(value).then((isValid) => {
      if (isValid) {
        return this.clearFieldError(this.formState, fieldName);
      }
      return this.setFieldError(this.formState, {
        errPath: fieldName,
        errMessage: "",
      });
    });
  }

  async submit() {
    this.isSending = true;
    this.submitCount += 1;

    const validInfo = await applySchema(this.schema, toJS(this.fieldsMap));

    if (!validInfo.isValid) {
      validInfo.errorRec.forEach((error) => {
        this.setFieldError(this.formState, error);
      });
      return;
    }

    try {
      await api.post(this.request, this.fieldsMap);
      this.sendingStatus = { isSuccess: true, message: "Успешно отправлено" };
    } catch (e) {
      let errMessage = "Ошибка при отправке";
      if (e instanceof AxiosError) {
        errMessage = JSON.parse(e.request.response).message || e.message;
      }

      this.sendingStatus = {
        isSuccess: false,
        message: errMessage,
      };
    }
    this.isSending = false;
  }
}
