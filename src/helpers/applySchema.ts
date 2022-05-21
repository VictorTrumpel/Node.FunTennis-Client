import { ObjectSchema, ValidationError } from "yup";
import { ObjectShape } from "yup/lib/object";

export type ErrorRec = { errPath: string; errMessage?: string };

type ApplySchema = (
  schema: ObjectSchema<ObjectShape>,
  fields: Record<string, any>
) => Promise<{ isValid: true } | { isValid: false; errorRec: ErrorRec[] }>;

export const applySchema: ApplySchema = async (schema, fields) => {
  try {
    await schema.validate(fields, {
      abortEarly: false,
    });
  } catch (e) {
    let errorRec: ErrorRec[] = [];
    if (e instanceof ValidationError) {
      errorRec = parseYupErrors(e.errors);
      return { isValid: false, errorRec };
    }
    return { isValid: false, errorRec };
  }
  return { isValid: true };
};

export const parseYupErrors = (
  errors: ValidationError["errors"]
): ErrorRec[] => {
  return errors.map((errText) => {
    const errPath = errText.split(" ")[0];
    const errMessage = errText.substring(errPath.length + 1);
    return { errPath, errMessage };
  });
};
