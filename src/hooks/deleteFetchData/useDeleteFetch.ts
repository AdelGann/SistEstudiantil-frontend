import { useEffect, useState } from "react";
import {
  DeleteHookProps,
  DeleteProps,
} from "./interfaces/DeleteFetch.interface";

import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { url } from "@/data/connections/mainApi";
import { useToast } from "../use-toast";

export const useDeleteFetch = ({ endpoint, options }: DeleteHookProps) => {
  const { title, description, onSuccessCallback, reloadFetchData } = options;
  const { toast } = useToast();
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const setInitialState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title, description });
      setInitialState();
      if (reloadFetchData) {
        reloadFetchData();
      }
      if (onSuccessCallback) {
        onSuccessCallback();
      }
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
  const Delete = async ({ ids }: DeleteProps) => {
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        `${url}${endpoint}${ids && ids.filter(Boolean).join("/")}`,
        { headers },
      );
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };
  return { Delete, isLoading };
};
