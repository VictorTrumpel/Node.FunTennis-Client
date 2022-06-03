import { useQuery } from "react-query";
import { trainApi, TrainInfo } from "@api/TrainApi";
import { TrainTab } from "@components/common/TrainTab";

export const TrainOverview = () => {
  const { data: train } = useQuery<TrainInfo[] | undefined>(
    "users",
    async () => await trainApi.getTrainList(),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {train?.map((t) => {
        return <TrainTab key={t?._id} trainInfo={t} />;
      })}
    </div>
  );
};
