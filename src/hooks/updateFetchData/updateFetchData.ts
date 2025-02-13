import { useEffect, useState } from "react";
import {
  UpdateHookProps,
  UpdateProps,
} from "./interfaces/UpdateFetch.interface";
import useAuthStore from "@/store/useAuthStore";
import { url } from "@/data/connections/mainApi";
import axios from "axios";
import { useToast } from "../use-toast";

export const useUpdateFetch = ({ endpoint, options }: UpdateHookProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { token } = useAuthStore();
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
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.patch(
        `${url}${endpoint}${ids && ids.filter(Boolean).join("/")}`,
        { headers },
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
