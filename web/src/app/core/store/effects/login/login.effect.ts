// import { inject } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { TranslateService } from "@ngx-translate/core";
// import { AuthService } from "@zenith/core/services/auth/auth.service";
// import * as LoginActions from '@zenith/core/store/actions/login.action';
// import { LoginSuccessResponse } from "@zenith/core/store/actions/login.action";
// import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
// import { catchError, exhaustMap, map, of } from "rxjs";

// export const login$ = createEffect(
//     (
//         actions$ = inject(Actions),
//         authService = inject(AuthService)
//     ) => actions$.pipe(
//         ofType(LoginActions.loginStart),
//         exhaustMap((action) => 
//             authService.login(action.payload).pipe(
//                 map((result: LoginSuccessResponse) => LoginActions.loginSuccess({ payload: result })),
//                 catchError(err => of(LoginActions.loginFail({ err, statusCode: 500 })))
//             )
//         )
//     ),
//     { functional: true }
// )

// export const loginSuccess$ = createEffect(
//     (
//         actions$ = inject(Actions),
//         translateService = inject(TranslateService),
//         // router = inject(Router)
//     ) => actions$.pipe(
//             ofType(LoginActions.loginSuccess),
//             map(() => {
//                 const message = translateService.instant('SuccessfulConnection')
//                 return ToastrActions.toastrMessageSuccess({ payload: { message }});
//             }),
//             // tap(() => router.navigateByUrl(PATH_CONFIG.HOME))
//         ),
//     { functional: true }
// )

// export const loginFail$ = createEffect(
//     (
//         actions$ = inject(Actions),
//         translateService = inject(TranslateService)
//     ) => actions$.pipe(
//             ofType(LoginActions.loginFail),
//             map((action) => {
//                 const errorMessage = translateService.instant('ErrorConnection');
//                 return ToastrActions.toastrMessageError(action)
//             })
//         ),
//     { functional: true }
// )