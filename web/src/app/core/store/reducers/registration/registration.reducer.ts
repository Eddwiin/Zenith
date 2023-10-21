import { createReducer, on } from "@ngrx/store"
import * as RegistrationAction from "@zenith/core/store/actions/registration.action"

export interface RegistrationState {
    emailExists: boolean
}

export const initialState: RegistrationState = {
    emailExists: false
}

export const registrationReducer = createReducer(
    initialState,
    on(RegistrationAction.emailExistsSuccess, 
        (state, action) => ({...state, emailExists: action.payload}))
)
