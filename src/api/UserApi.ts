import { api } from "@api/api";
import { UserInfo } from "@store/User/@types";

export class UserApi {
  private baseUrl = "/users";

  async getUser(id: string): Promise<UserInfo | undefined> {
    try {
      const axiosResponse = await api.get<UserInfo>(`${this.baseUrl}/${id}`);
      return axiosResponse.data;
    } catch (e) {
      console.error(e);
    }
  }
}
