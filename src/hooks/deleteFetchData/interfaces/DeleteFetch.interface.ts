interface OptionProps {
  title: string;
  description: string;
  reloadFetchData?: () => void;
  onSuccessCallback?: () => void;
}

export interface DeleteHookProps {
  endpoint: string;
  options: OptionProps;
}
export interface DeleteProps {
  ids: string[];
}
