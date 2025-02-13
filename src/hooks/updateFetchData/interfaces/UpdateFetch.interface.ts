export interface OptionProps {
  title?: string;
  description?: string;
  reloadFetchData?: () => void;
}

export interface UpdateHookProps {
  endpoint: string;
  options: OptionProps;
}

export interface UpdateProps {
  ids: string[];
}
