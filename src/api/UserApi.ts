import { api } from "@api/api";
import { UserInfo } from "@store/User/@types";

export class UserApi {
  private baseUrl = "/users";

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
