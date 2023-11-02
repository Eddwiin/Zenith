import { createActionGroup, props } from "@ngrx/store";
import { ToastrError } from "@zenith/core/models/toastr-error";
import { PickUserEmailAndPassword } from "@zenith/core/models/user";

export type LoginSuccessResponse = { token: string };

export const LOGIN_ACTIONS = createActionGroup({
    source: 'LOGIN',
    events: {
        loginStart: props<{ payload: PickUserEmailAndPassword }>(),
        loginSuccess: props<{ payload: LoginSuccessResponse }>(),
        loginFail: props<{ err: ToastrError}>()
    }
})

export const {loginStart, loginSuccess, loginFail} = LOGIN_ACTIONS;