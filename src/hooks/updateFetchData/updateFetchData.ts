import { useEffect, useState } from "react";
import {
  UpdateHookProps,
  UpdateProps,
} from "./interfaces/UpdateFetch.interface";
import { useToast } from "../use-toast";
import { api } from "@/data/connections";

export const useUpdateFetch = ({ endpoint, options }: UpdateHookProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { toast } = useToast();

  const setInitialState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      if (options.title) {
        toast({ title: "Subiendo datos..." });
        toast({ title: options.title, description: options.description });
      }
      setInitialState();
      if (options.reloadFetchData) options.reloadFetchData();
    } else {
      if (error !== null) {
        toast({
          title: "something went wrong",
          description: `${error}`,
          variant: "destructive",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const Update = async ({ ids }: UpdateProps) => {
    setIsLoading(true);
    try {
      const res = await api.patch(
        `${endpoint}${ids && ids.filter(Boolean).join("/")}`,
      );
      setIsLoading(false);
      setIsSuccess(true);
      return res.data;
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };
  return { Update, isLoading };
};
