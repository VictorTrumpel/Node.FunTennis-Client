import { api } from "@api/api";
import { UserInfo } from "@store/User/@types";
import queryString from "query-string";

export class UserApi {
  private baseUrl = "/users";

  async getUserList(
    options: Record<string, string> = {}
  ): Promise<UserInfo[] | undefined> {
    const queryOptions = queryString.stringify(options);

    try {
      const response = await api.get<UserInfo[] | undefined>(
        `${this.baseUrl}?${queryOptions}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(id: string): Promise<UserInfo | undefined> {
    try {
      const response = await api.get<UserInfo>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchByName(fullName: string = ""): Promise<UserInfo[] | undefined> {
    try {
      const response = await api.get<UserInfo[]>(
        `${this.baseUrl}/searchByName?fullName=${fullName}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

export const userApi = new UserApi();
