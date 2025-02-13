export interface OptionProps {
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
  params?: Record<string, unknown>;
  path?: string;
  isBlob?: boolean;
}
export interface PostProps<T> {
  data: T;
  options?: PostFuncOptionsProps;
}
