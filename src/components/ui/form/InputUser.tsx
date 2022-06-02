import { UserInfo } from "@store/User/@types";
import { userApi } from "@api/UserApi";
import { useEffect, useState, useCallback, useRef } from "react";
import { FloatingLabel } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import classNames from "classnames";

type TypeaheadRef = {
  inputNode: { value: string };
};

export const InputUser = () => {
  const [users, setUsers] = useState<InputSelectOption[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef(null);

  const onUserSelect = useCallback((u: UserInfo[]) => {
    console.log(u);
  }, []);

  const onBlur = useCallback(() => {
    if (ref) {
      console.log(ref);
      const value = (ref.current as unknown as TypeaheadRef)?.inputNode?.value;
      if (value) return;
      setIsFocused(false);
      return;
    }
    setIsFocused(false);
  }, []);

  useEffect(() => {
    (async () => {
      const users = await loadUserOptions();
      setUsers(users);
    })();
  }, []);

  return (
    <FloatingLabel
      label="лейбл"
      className={classNames("input-autocomplete_label", {
        focused: isFocused,
      })}
    >
      <Typeahead
        ref={ref}
        className="input-autocomplete"
        id="user-search"
        options={users}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
        onChange={(users) => onUserSelect(users as UserInfo[])}
      />
    </FloatingLabel>
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
