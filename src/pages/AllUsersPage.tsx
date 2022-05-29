import { Container, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { UserInfo } from "@store/User/@types";
import { userApi } from "@api/UserApi";
import { ModelInput } from "@components/ui/form/ModelInput";
import { useDebounceInput } from "@hooks/useDebounceInput";
import { useQuery } from "react-query";
import { UserTab } from "@components/common/UserTab";
import { Visible } from "@components/common/Visible";

export const AllUsersPage = () => {
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
    <Container fluid className="paper">
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
    </Container>
  );
};
