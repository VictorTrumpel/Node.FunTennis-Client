import queryString from "query-string";
import { api } from "@api/api";

export type TrainInfo = {
  _id: string;
  participants: string[];
  trainer: string[];
  date: Date | null;
  info: string;
};

export class TrainApi {
  private baseUrl = "/train";

  async getTrainList(
    options: Record<string, string> = {}
  ): Promise<TrainInfo[] | undefined> {
    const queryOptions = queryString.stringify(options);

    try {
      const response = await api.get<TrainInfo[] | undefined>(
        `${this.baseUrl}?${queryOptions}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getTrain(id: string): Promise<TrainInfo | undefined> {
    try {
      const response = await api.get<TrainInfo>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

export const trainApi = new TrainApi();
