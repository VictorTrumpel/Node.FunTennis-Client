import { useDebounceInput } from "@hooks/useDebounceInput";
import { useQuery } from "react-query";
import { UserInfo } from "@store/User/@types";
import { userApi } from "@api/UserApi";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { ModelInput } from "@components/ui/form/ModelInput";
import { Visible } from "@components/common/Visible";
import { UserTab } from "@components/common/UserTab";

export const UsersOverview = () => {
  const { value, debounceChange } = useDebounceInput();
  const {
    data: users,
    refetch,
    isFetching,
  } = useQuery<UserInfo[] | undefined>(
    "users",
    async () => await userApi.searchByName(value),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [value]);

  return (
    <>
      <div className="mb-3">
        <ModelInput
          placeholder="Поиск"
          onChange={debounceChange}
          endAdornment={() => (
            <Visible condition={isFetching}>
              <Spinner animation="border" />
            </Visible>
          )}
        />
      </div>
      {users?.map((user) => {
        return <UserTab key={user?._id} userInfo={user} />;
      })}
    </>
  );
};
