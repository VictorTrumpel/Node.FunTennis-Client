import { userApi } from "@api/UserApi";
import { useEffect, useState, useCallback, useMemo } from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { observer } from "mobx-react-lite";
import { ModelInputAutocomplete } from "@components/ui/form/ModelInputAutocomplete";
import { useForm } from "@components/ui/form/Form";
import { UserInfo } from "@store/User/@types";
import { CloseButton } from "react-bootstrap";
import get from "lodash.get";
import { toJS } from "mobx";

export const InputUser = observer(({ name }: { name: string }) => {
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
      const users = await loadUserOptions();
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
        label="Введите участника"
      />
    </div>
  );
});

type InputUserTabProps = {
  userId: string;
  onDelete: (id: string) => void;
};

const InputUserTab = ({ userId, onDelete }: InputUserTabProps) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    (async () => {
      const userRes = await userApi.getUser(userId);
      if (userRes) {
        setUser(userRes);
      }
    })();
  }, [userId]);

  if (!user) return <></>;

  return (
    <li className="d-flex align-items-center">
      <span>{user.fullName}</span>{" "}
      <CloseButton onClick={onDelete.bind(null, userId)} />
    </li>
  );
};

const loadUserOptions = async (): Promise<InputSelectOption[]> => {
  const usersRes = await userApi.getUserList();
  const options: InputSelectOption[] = [];
  usersRes?.forEach(({ username, fullName, _id }) => {
    if (username === "admin") return;
    options.push({ value: _id, label: fullName });
  });
  return options;
};
