export type HookObject<T> = {
  data: T[];
  isLoading: boolean;
  reloadFetchData: (endpoint?: string) => Promise<void>;
  setFilterData: (data: T[]) => void;
};
