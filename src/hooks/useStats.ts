import useSWR from "swr";
import { fetcher } from "util/fetcher";

export const useStats = () => {
  type Data = {
    creations: any[];
  };

  const { data, error, isLoading, mutate } = useSWR<Data>(
    "/api/creations",
    fetcher
  );

  const stats: {
    [key: string]: {
      totalCreations: number;
      // uniqueUsers: Set<string>;
      userCounts: { [key: string]: number };
    };
  } = {};

  if (data?.creations) {
    data.creations.forEach((creation: any) => {
      const date = new Date(creation.createdAt).toISOString().slice(0, 10);
      if (!stats[date]) {
        stats[date] = {
          totalCreations: 0,
          // uniqueUsers: new Set(),
          userCounts: {},
        };
      }
      stats[date].totalCreations++;
      //stats[date].uniqueUsers.add(creation.user);
      stats[date].userCounts[creation.user] =
        (stats[date].userCounts[creation.user] || 0) + 1;
    });
  }

  return {
    stats,
    isLoading,
    error: data?.error,
    mutate,
  };
};
