import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { ErrorAPI } from "@zenith/core/models/error-api";
import { ToastrError } from "@zenith/core/models/toastr-error";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import * as RegistrationActions from "@zenith/core/store/actions/registration.action";
import * as ToastrActions from "@zenith/core/store/actions/toastr.action";
import { catchError, debounceTime, exhaustMap, map, of, tap } from "rxjs";

export const checkEmailExists$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        translateService = inject(TranslateService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationActions.emailExistsStart),
            exhaustMap((action) => {
                return authService.checkEmailExists(action.payload).pipe(
                    map((isEmailExists) => RegistrationActions.setEmailExists({ payload: isEmailExists as boolean })),
                    catchError((errorApi: ErrorAPI) => {
                        const error: ToastrError = {
                            message: errorApi.err?.message || translateService.instant('SomethingWrong'),
                            statusCode: errorApi.err?.statusCode || 500
                        };
                        return of(RegistrationActions.emailExistsFail({ err: error }))
                    }),
                )
            })
        )
    },
    { functional: true }
)


export const checkEmailExistsFail$ = createEffect(
    (
        actions$ = inject(Actions)
    ) => {
        return actions$.pipe(
            ofType(RegistrationActions.emailExistsFail),
            map((action) => ToastrActions.toastrMessageError({ err: action.err }))
        )
    },
    { functional: true }
)

export const createAccount$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
    ) => {
        return actions$.pipe(
            ofType(RegistrationActions.createAccountStart),
            exhaustMap((action) => {
                return authService.createAccount(action.payload).pipe(
                    map((isCreated) => {
                        if (isCreated) return  RegistrationActions.createAccountSuccess();
                        const err: ToastrError = { statusCode: 422 }
                        return RegistrationActions.createAccountFail({ err })
                    }),
                    catchError((err: ErrorAPI) => {
                        const toastrError: ToastrError = { message: err.err?.message, statusCode: 500 }
                        return of(RegistrationActions.createAccountFail({ err: toastrError}));
                    })
                )
            })
        )
    },
    { functional: true }
)

export const createAccountSuccess$ = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        translateService = inject(TranslateService)
    ) => actions$.pipe(
            ofType(RegistrationActions.createAccountSuccess),
            debounceTime(1000),
            map(() => {
                const successMessage = translateService.instant('AccountCreated')
                return ToastrActions.toastrMessageSuccess({ payload: { message: successMessage }})
            }),
            tap(() => router.navigateByUrl(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`))
        ),
    { functional: true },
)

export const createAccountFail$ = createEffect(
    (
        actions$ = inject(Actions),
    ) => {
        return actions$.pipe(
            ofType(RegistrationActions.createAccountFail),
            map(action => ToastrActions.toastrMessageError(action))
        )
    },
    { functional: true  }
)