import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserWithoutId } from '../../models/user';

type ErrorAPI = { err: unknown, statusCode: number }

export const CHECK_EMAIL_EXISTS_ACTIONS = createActionGroup({
    source: 'CHECK EMAIL EXISTS',
    events: {
        emailExistsStart: props<{payload: string }>(),
        emailExistsSuccess: props<{ payload: boolean}>(),
        emailExistsFail: props<ErrorAPI>()
    }
});

export const CREATE_ACCOUNT_ACTIONS = createActionGroup({
    source: 'CREATE ACCOUNT',
    events: {
        createAccountStart: props<{ payload: UserWithoutId}>(),
        createAccountSuccess: emptyProps(),
        createAccountFail: props<ErrorAPI>(),
    }
})

export const { emailExistsStart, emailExistsSuccess, emailExistsFail } = CHECK_EMAIL_EXISTS_ACTIONS
export const { createAccountStart, createAccountSuccess, createAccountFail } = CREATE_ACCOUNT_ACTIONS;



