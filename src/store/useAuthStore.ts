import { create } from "zustand";

interface AuthState {
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem("rt__SistEstudiantil"),
	login: (newToken: string) => {
		localStorage.setItem("rt__SistEstudiantil", newToken);
		set({ token: newToken });
	},
	logout: () => {
		localStorage.removeItem("rt__SistEstudiantil");
		set({ token: null });
	},
}));

export default useAuthStore;
