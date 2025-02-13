export interface OptionProps {
  title?: string;
  description?: string;
  reloadFetchData?: () => void;
}

export interface UpdateHookProps {
  options?: OptionProps;
}

export interface UpdateProps<T> {
  ids: string[];
  data: T;
}
