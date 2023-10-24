import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import * as RegistrationActions from "@zenith/core/store/actions/registration.action";
import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
import { catchError, debounceTime, exhaustMap, map, mergeMap, of, tap } from "rxjs";

export const checkEmailExists$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService)
    ) => actions$.pipe(
            ofType(RegistrationActions.emailExistsStart),
            exhaustMap((action) => 
                authService.checkEmailExists(action.payload).pipe(
                    map((isEmailExists) => RegistrationActions.emailExistsSuccess({ payload: isEmailExists })),
                    catchError(err => of(RegistrationActions.emailExistsFail({ err, statusCode: 500 })))
                )
            )
        ),
    { functional: true}
)


export const createAccount$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
    ) =>  actions$.pipe(
            ofType(RegistrationActions.createAccountStart),
            mergeMap((action) => 
                authService.createAccount(action.payload).pipe(
                    map(isCreated => isCreated ? RegistrationActions.createAccountSuccess() : RegistrationActions.createAccountFail({ err: { isCreated }, statusCode: 500})),
                    catchError(err => of(RegistrationActions.createAccountFail({ err, statusCode: 500})))
                )  
            )
        ),
    { functional: true }
)

export const createAccountSuccess$ = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
    ) => actions$.pipe(
            ofType(RegistrationActions.createAccountSuccess),
            debounceTime(1000),
            map(() => ToastrActions.toastrMessageSuccess()),
            tap(() => router.navigateByUrl(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`))
        ),
    { functional: true, dispatch: false},
)

export const createAccountFail$ = createEffect(
    (
        actions$ = inject(Actions),
    ) => {
        return actions$.pipe(
            ofType(RegistrationActions.createAccountFail),
            map(action => ToastrActions.toastrMessageError({ err: action.err}))
        )
    },
    { functional: true, dispatch: false }
)