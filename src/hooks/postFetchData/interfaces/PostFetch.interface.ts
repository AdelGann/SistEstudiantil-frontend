interface OptionProps {
  title?: string;
  description?: string;
  reloadFetchData?: () => void;
}

export interface PostHookProps {
  endpoint: string;
  options: OptionProps;
}

interface PostFuncOptionsProps {
  query?: string;
  params?: string;
  path?: string;
  isBlob?: boolean;
  returnResponse?: boolean;
}
export interface PostProps<T> {
  data: T;
  options: PostFuncOptionsProps;
}
