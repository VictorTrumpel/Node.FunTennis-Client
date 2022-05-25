import { BaseForm } from "@store/BaseForm";
import { useEffect, useState } from "react";
import { BaseFieldsValuesMap } from "@store/BaseForm/@types";
import { AxiosError } from "axios";

export function useEditForm<
  ResponseFields extends BaseFieldsValuesMap = BaseFieldsValuesMap,
  FieldsMap extends BaseFieldsValuesMap = ResponseFields
>(
  form: BaseForm,
  fetch: () => Promise<ResponseFields | undefined>,
  adapter: (fields: ResponseFields) => FieldsMap = (fields) =>
    ({ ...fields } as unknown as FieldsMap)
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [defaultValues, setDefaultValues] = useState<FieldsMap | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await fetch();
        setIsLoading(false);

        if (!userInfo) return;
        setDefaultValues(adapter(userInfo));
        form.resetFieldsMap(adapter(userInfo));
      } catch (e) {
        setIsLoading(false);
        if (e instanceof AxiosError) {
          setError(e);
          return;
        }
        console.error(e);
      }
    })();
  }, []);

  return { isLoading, error, defaultValues };
}
