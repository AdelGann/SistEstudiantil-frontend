import { AxiosResponse } from "axios";
import { PostProps } from "./hooks/postFetchData/interfaces/PostFetch.interface";
import { UpdateProps } from "./hooks/updateFetchData/interfaces/UpdateFetch.interface";

export interface ModalProps<T1, T2> {
  InitialData?: T2 | null;
  onClose?: () => void;
  postFetchData: ({
    data,
    options,
  }: PostProps<T1>) => Promise<AxiosResponse<T2>>;
  updateFetchData: ({
    ids,
    data,
  }: UpdateProps<T1>) => Promise<AxiosResponse<T2>>;
}
