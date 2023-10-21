import { createSelector } from "@ngrx/store";
import { RegistrationState } from "@zenith/core/store/reducers/registration/registration.reducer";
import { AppState } from "@zenith/core/store/store.config";

export const selectRegistration = (state: AppState) => state.registration;

export const selectEmailExists = createSelector(
    selectRegistration,
    (state: RegistrationState) => state.emailExists
)
