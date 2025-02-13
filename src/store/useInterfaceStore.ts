import { RolesType } from "@/types";
import { create } from "zustand";

interface AuthState {
  role: RolesType | undefined;
  setInterface: (role: "ADMIN" | "TEACHER" | "USER" | undefined) => void;
  setNull: () => void;
}

const useInterfaceStore = create<AuthState>((set) => ({
  role: undefined,
  setInterface: (role) => {
    set({ role });
  },
  setNull: () => {
    set({ role: undefined });
  },
}));

export default useInterfaceStore;
