import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/data/connections/mainApi";
import { HookObject } from "./object/hook.object";
import useAuthStore from "@/store/useAuthStore";

export const useGetFetch = <T>(
  endpoint: string,
  { params }: { params: Record<string, unknown> },
): HookObject<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getFetchData = async (customEndpoint?: string) => {
    try {
      const endpointToFetch = `${url}${customEndpoint ? customEndpoint : endpoint}`;
      const res = await axios.get(endpointToFetch, { headers, params });

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
