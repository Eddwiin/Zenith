import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/core/services/auth/auth.service";
import * as AuthActions from '../../actions/auth/auth.action';

@Injectable()
export class AuthEffects {
    actions$ = inject(Actions);
    authService = inject(AuthService)

    saveMember$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.START_SAVE_MEMBER),
            mergeMap((action) => 
                this.authService.saveMember(action.payload).pipe(
                    mergeMap(() => of(AuthActions.SUCCESS_SAVE_MEMBER({ success: true}))),
                    catchError((error) => of(AuthActions.FAIL_SAVE_MEMBER({ error: error})))
                )
            )
        )
    )
}
