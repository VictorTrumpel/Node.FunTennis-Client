import { userApi } from "@api/UserApi";
import { useEffect, useState, useCallback, useMemo } from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { observer } from "mobx-react-lite";
import {
  ModelInputAutocomplete,
  ModelInputAutocompleteProps,
} from "@components/ui/form/ModelInputAutocomplete";
import { useForm } from "@components/ui/form/Form";
import { InputUserTab } from "./InputUserTab";
import get from "lodash.get";
import { toJS } from "mobx";
import { UserInfo } from "@store/User/@types";
import { FieldState } from "@store/BaseForm/@types";

type InputUserProps = Omit<
  ModelInputAutocompleteProps,
  "options" | "handleSelect"
> & {
  name: string;
  placeholder?: string;
  role: UserInfo["role"];
};

export const InputUser = observer(
  ({ name, placeholder, role, disabled, ...props }: InputUserProps) => {
    const { formState, onChange, defaultValues } = useForm();

    const defaultIds = useMemo(() => get(toJS(defaultValues), name), []);
    const fieldState = get(toJS(formState), name) as FieldState;

    const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>(
      defaultIds || []
    );
    const [users, setUsers] = useState<InputSelectOption[]>([]);

    const onUserDelete = useCallback((deleteId: string) => {
      if (disabled) return;
      setSelectedUsersIds((ids) => {
        return [...ids].filter((id) => id !== deleteId);
      });
    }, []);

    const onUserSelect = useCallback((u: InputSelectOption[]) => {
      const newId = u[0]?.value;
      if (!newId) return;
      setSelectedUsersIds((ids) => {
        const newIdsRec: string[] = [];
        const uniqIdsCollection = new Set([...ids, newId]);
        uniqIdsCollection.forEach((id) => newIdsRec.push(id));
        return newIdsRec;
      });
    }, []);

    useEffect(() => {
      onChange(name, [...selectedUsersIds]);
    }, [selectedUsersIds]);

    useEffect(() => {
      (async () => {
        const users = await loadUserOptions({ role });
        setUsers(users);
      })();
    }, []);

    return (
      <div className="input-user">
        <ul className="input-user_list">
          {selectedUsersIds.map((id) => (
            <InputUserTab key={id} userId={id} onDelete={onUserDelete} />
          ))}
        </ul>
        <ModelInputAutocomplete
          name={name}
          fieldState={fieldState}
          options={users}
          handleSelect={onUserSelect}
          placeholder={placeholder || name}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

const loadUserOptions = async (
  queryOptions: Record<string, string>
): Promise<InputSelectOption[]> => {
  const usersRes = await userApi.getUserList({ ...queryOptions });
  const userOptions: InputSelectOption[] = [];
  usersRes?.forEach(({ username, fullName, _id, level }) => {
    if (username === "admin") return;
    userOptions.push({ value: _id, label: `${fullName} (${level})` });
  });
  return userOptions;
};
