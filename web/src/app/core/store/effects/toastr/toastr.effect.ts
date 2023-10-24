import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs";

export const toastrMessageSuccess$ = createEffect(
    (
        actions$ = inject(Actions),
        translateService = inject(TranslateService),
        toastr = inject(ToastrService)
    ) => actions$.pipe(
            ofType(ToastrActions.toastrMessageSuccess),
            tap(() => {
                const successTitle = translateService.instant('Succcess');
                const successMessage = translateService.instant('AccountCreated')
                toastr.success(successMessage, successTitle)
            })
        ),
    { functional: true, dispatch: false}
)

export const toastrMessageError$ = createEffect(
    (
        actions$ = inject(Actions),
        translateService = inject(TranslateService),
        toastr = inject(ToastrService)
    ) => actions$.pipe(
        ofType(ToastrActions.toastrMessageError),
        tap(() => {
            const errorTitle = translateService.instant('Error');
            const errorMessage = translateService.instant('SomethingWrong')

            toastr.error(errorMessage, errorTitle)
        })
    ),
    { functional: true, dispatch: false }
)