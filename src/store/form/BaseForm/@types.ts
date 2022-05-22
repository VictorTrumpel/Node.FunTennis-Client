export type PrimitiveFieldValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | bigint;

export type FieldValue = PrimitiveFieldValue | PrimitiveFieldValue[];
export type FieldState = {
  isError: boolean;
  errMessage?: string;
};

export type BaseFieldsValuesMap = {
  [field: string]: FieldValue | BaseFieldsValuesMap | BaseFieldsValuesMap[];
};

export type BaseFormState = {
  [field: string]: FieldState | BaseFormState | BaseFormState[];
};
