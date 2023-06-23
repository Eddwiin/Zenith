import { createReducer, on } from "@ngrx/store";
import * as AuthActions from '../actions/auth/auth.action';

export interface AuthState {
    isLoading: boolean;
}

export const initialState: AuthState = {
    isLoading: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.LOAD_SAVE_MEMBER, (state) => ({ isLoading: true}))
)