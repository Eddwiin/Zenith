import { createReducer, on } from "@ngrx/store"
import * as RegistrationAction from "../../actions/registration.action"

export interface RegistrationState {
    emailExists: boolean
}

const initialState: RegistrationState = {
    emailExists: false
}

export const registrationReducer = createReducer(
    initialState,
    on(RegistrationAction.emailExistsSuccess, 
        (state, action) => ({...state, emailExists: action.payload}))
)
