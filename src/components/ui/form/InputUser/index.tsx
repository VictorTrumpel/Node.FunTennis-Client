import { userApi } from "@api/UserApi";
import { useEffect, useState, useCallback, useMemo } from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { observer } from "mobx-react-lite";
import { ModelInputAutocomplete } from "@components/ui/form/ModelInputAutocomplete";
import { useForm } from "@components/ui/form/Form";
import { InputUserTab } from "./InputUserTab";
import get from "lodash.get";
import { toJS } from "mobx";
import { UserInfo } from "@store/User/@types";

type InputUserProps = {
  name: string;
  placeholder?: string;
  role: UserInfo["role"];
};

export const InputUser = observer(
  ({ name, placeholder, role }: InputUserProps) => {
    const { onChange, defaultValues } = useForm();

    const defaultIds = useMemo(() => get(toJS(defaultValues), name), []);

    const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>(
      defaultIds || []
    );
    const [users, setUsers] = useState<InputSelectOption[]>([]);

    const onUserDelete = useCallback((deleteId: string) => {
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
            <InputUserTab userId={id} onDelete={onUserDelete} />
          ))}
        </ul>
        <ModelInputAutocomplete
          name={name}
          options={users}
          handleSelect={onUserSelect}
          label={placeholder || name}
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
