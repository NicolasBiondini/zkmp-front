import { create } from "zustand";
import { InitialState, AppState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useAppState = create<AppState>()((set) => ({
  ...getInitialStorageState(),
  setProviderAndContract: (provider, contract) => {
    set((state) => ({ ...state, provider, contract }));
  },
}));
