import { Contract, JsonRpcProvider } from "ethers";

export interface InitialState {
  provider: JsonRpcProvider | null;
  contract: Contract | null;
}

export interface AppState extends InitialState {
  setProviderAndContract: (
    provider: JsonRpcProvider,
    contract: Contract
  ) => void;
}

export const initialState: InitialState = {
  provider: null,
  contract: null,
};
