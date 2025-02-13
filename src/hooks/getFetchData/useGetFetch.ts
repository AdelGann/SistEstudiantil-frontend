import { useEffect, useState } from "react";
import { HookObject } from "./object/hook.object";
import { api } from "@/data/connections";

export const useGetFetch = <T>(
  endpoint: string,
  { params }: { params: Record<string, unknown> },
): HookObject<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFetchData = async (customEndpoint?: string) => {
    try {
      const endpointToFetch = `${customEndpoint ? customEndpoint : endpoint}`;
      const res = await api.get(endpointToFetch, { params });

      setData(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const reloadFetchData = async (customEndpoint?: string) => {
    await getFetchData(customEndpoint);
  };

  const setFilterData = (data: T[]) => {
    setData(data);
  };

  useEffect(() => {
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, reloadFetchData, setFilterData };
};
