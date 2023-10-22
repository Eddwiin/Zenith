import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import * as RegistrationAction from "@zenith/core/store/actions/registration.action";
import { ToastrService } from "ngx-toastr";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";

export const checkEmailExists$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationAction.emailExistsStart),
            exhaustMap((action) => 
                authService.checkEmailExists(action.payload).pipe(
                    map((isEmailExists) => RegistrationAction.emailExistsSuccess({ payload: isEmailExists })),
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
        authService = inject(AuthService),
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

export const createAccountSuccess$ = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        toastr = inject(ToastrService),
        translateService = inject(TranslateService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationAction.createAccountSuccess),
            tap(() => {
                const successTitle = translateService.instant('Succcess');
                const successMessage = translateService.instant('AccountCreated')
                toastr.success(successMessage, successTitle)
                router.navigateByUrl(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`)
            })
        )
    },
    { functional: true, dispatch: false},
)

export const createAccountFail$ = createEffect(
    (
        actions$ = inject(Actions),
        toastr = inject(ToastrService),
        translateService = inject(TranslateService)
    ) => {
        return actions$.pipe(
            ofType(RegistrationAction.createAccountFail),
            tap(action => {
                const errorTitle = translateService.instant('Error');
                const errorMessage = translateService.instant('SomethingWrong')
                console.error(action.err);
                toastr.error(errorMessage, errorTitle)
            })
        )
    },
    { functional: true, dispatch: false }
)