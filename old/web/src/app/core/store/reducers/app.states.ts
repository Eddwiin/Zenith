import { StoreKeys } from "../../configs/store-keys.config";
import { AuthState } from "./auth.reducer";

export interface AppState {
    [StoreKeys.Auth]: AuthState
}