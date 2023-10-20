import { createSelector } from "@ngrx/store";
import { RegistrationState } from "../reducers/registration/registration.reducer";
import { AppState } from "../store.config";

export const selectRegistration = (state: AppState) => state.registration;

export const selectEmailExists = createSelector(
    selectRegistration,
    (state: RegistrationState) => state.emailExists
)