import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { url } from "@/data/connections/mainApi";
import { useNavigate } from "react-router-dom";
import { PostHookProps, PostProps } from "./interfaces/PostFetch.interface";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "../use-toast";

export const usePostFetch = ({ endpoint, options }: PostHookProps) => {
  const { title, description, reloadFetchData } = options;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { toast } = useToast();
  const { token } = useAuthStore();

  const setInitialState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      if (title) {
        toast({ title: "Subiendo datos..." });
        toast({ title, description });
      }
      setInitialState();
      if (reloadFetchData) reloadFetchData();
    }
    if (error !== null) {
      toast({
        title: "something went wrong",
        description: `${error}`,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  const Post = async <T>({
    data,
    options,
  }: PostProps<T>): Promise<AxiosResponse<T>> => {
    const { params, path, query, isBlob, returnResponse } = options;
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let res: AxiosResponse<T>;
    if (!isBlob) {
      res = await axios.post(
        `${url}${endpoint}${params ? `/${params}` : ""}${query ? `?${query}` : ""}`,
        data,
        { headers },
      );
    } else {
      res = await axios.post(
        `${url}${endpoint}${params ? `/${params}` : ""}${query ? `?${query}` : ""}`,
        data,
        { headers, responseType: "blob" },
      );
    }
    setIsLoading(false);
    setIsSuccess(true);
    if (path) {
      setTimeout(() => {
        navigate(path);
      }, 1000);
    }
    if (returnResponse) {
      return res;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.data as any;
  };
  return {
    Post,
    isLoading,
  };
};
