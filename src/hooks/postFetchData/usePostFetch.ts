import { useEffect, useState } from "react";
import { AxiosResponse, ResponseType } from "axios";
import { useNavigate } from "react-router-dom";
import { OptionProps, PostProps } from "./interfaces/PostFetch.interface";
import { useToast } from "../use-toast";
import { api } from "@/data/connections";

export const usePostFetch = (endpoint: string, options?: OptionProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<unknown | any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { toast } = useToast();

  const setInitialState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      if (options?.title) {
        toast({ title: "Subiendo datos..." });
        toast({ title: options?.title, description: options?.description });
      }
      setInitialState();
      if (options?.reloadFetchData) options?.reloadFetchData();
    }
    if (error !== null) {
      toast({
        title: "something went wrong",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: `${error.message as any}`,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const Post = async <T1, T2>({
    data,
    options,
  }: PostProps<T1>): Promise<AxiosResponse<T2>> => {
    try {
      setIsLoading(true);
      const config = {
        params: options?.params,
        responseType: options?.isBlob ? "blob" : "json",
      };
      const res: AxiosResponse<T2> = await api.post(
        `${endpoint}${options?.query ? `?${options?.query}` : ""}`,
        data,
        {
          params: config.params,
          responseType: config.responseType as ResponseType,
        },
      );
      setIsLoading(false);
      setIsSuccess(true);
      if (options?.path) {
        setTimeout(() => {
          navigate(`${options?.path}`);
        }, 1000);
      }
      return res;
    } catch (e) {
      setError(e || "An unexpected error occurred");
      return Promise.reject(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    Post,
    isLoading,
    error,
  };
};
