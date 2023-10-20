import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { AuthService } from "../../../services/auth/auth.service";
import * as RegistrationAction from "../../actions/registration.action";

export const checkEmailExists$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationAction.emailExistsStart),
            exhaustMap((action) => 
                authService.checkEmailExists(action.payload).pipe(
                    map((isEmailExists) => RegistrationAction.emailExistsSuccess({ payload: isEmailExists})),
                    catchError(err => of(RegistrationAction.emailExistsFail({ err, statusCode: 500 })))
                )
            )
        )
    },
    { functional: true}
)

export const createAccount$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationAction.createAccountStart),
            mergeMap(() => 
                authService.createAccount().pipe(
                    map(isCreated => isCreated ? RegistrationAction.createAccountSuccess() : RegistrationAction.createAccountFail({ err: isCreated, statusCode: 500})),
                    catchError(err => of(RegistrationAction.createAccountFail({ err, statusCode: 500})))
                )
            )
        )
    },
    { functional: true }
)
