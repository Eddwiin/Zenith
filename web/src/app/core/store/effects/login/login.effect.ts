import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { ErrorAPI } from "@zenith/core/models/error-api";
import { ToastrError } from "@zenith/core/models/toastr-error";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import * as LoginActions from '@zenith/core/store/actions/login.action';
import { LoginSuccessResponse } from "@zenith/core/store/actions/login.action";
import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
import { catchError, exhaustMap, map, of, tap } from "rxjs";

export const login$ = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        translateService = inject(TranslateService)
    ) => actions$.pipe(
        ofType(LoginActions.loginStart),
        exhaustMap((action) => 
            authService.login(action.payload).pipe(
                map((result: LoginSuccessResponse) => LoginActions.loginSuccess({ payload: result })),
                catchError((errApi: ErrorAPI) => {
                    const errorMessage = errApi.status === 401 
                        ? translateService.instant('ErrorConnection') 
                        : errApi.err?.message;

                    const toastrError: ToastrError = {
                        message: errorMessage,
                        statusCode: errApi.status
                    };

                    return of(LoginActions.loginFail({ err: toastrError }))
                })
            )
        )
    ),
    { functional: true }
)

export const loginSuccess$ = createEffect(
    (
        actions$ = inject(Actions),
        translateService = inject(TranslateService),
        router = inject(Router)
    ) => actions$.pipe(
            ofType(LoginActions.loginSuccess),
            map(() => {
                const message = translateService.instant('SuccessfulConnection')
                return ToastrActions.toastrMessageSuccess({ payload: { message }});
            }),
            tap(() => router.navigateByUrl(PATH_CONFIG.HOME))
        ),
    { functional: true }
)

export const loginFail$ = createEffect(
    (
        actions$ = inject(Actions),
    ) => actions$.pipe(
            ofType(LoginActions.loginFail),
            map((action) => {
                const message = action.err?.message;
                const toastrError: ToastrError = {
                    message,
                    statusCode: action.err.statusCode,
                }
                return ToastrActions.toastrMessageError({ err: toastrError })
            })
        ),
    { functional: true }
)