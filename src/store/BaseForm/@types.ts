export type PrimitiveFieldValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | bigint
  | string[];

export type FieldValue = PrimitiveFieldValue | PrimitiveFieldValue[];
export type FieldState = {
  isError: boolean;
  errMessage?: string;
};
export type SendingStatus =
  | null
  | { isSuccess: true; message?: string }
  | { isSuccess: false; message?: string };

export type BaseFieldsValuesMap = {
  [field: string]: FieldValue | BaseFieldsValuesMap | BaseFieldsValuesMap[];
};

export type BaseFormState = {
  [field: string]: FieldState | BaseFormState | BaseFormState[];
};
