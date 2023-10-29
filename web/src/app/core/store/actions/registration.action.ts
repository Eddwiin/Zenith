import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserWithoutId } from '@zenith/app/core/models/user';
import { ToastrError } from '@zenith/core/models/toastr-error';

type SetPayloadEmailExists = { payload: boolean };

export const CHECK_EMAIL_EXISTS_ACTIONS = createActionGroup({
    source: 'CHECK EMAIL EXISTS',
    events: {
        emailExistsStart: props<{payload: string }>(),
        setEmailExists: props<SetPayloadEmailExists>(),
        emailExistsFail: props<{ err: ToastrError}>(),
    }
});

export const CREATE_ACCOUNT_ACTIONS = createActionGroup({
    source: 'CREATE ACCOUNT',
    events: {
        createAccountStart: props<{ payload: UserWithoutId}>(),
        createAccountSuccess: emptyProps(),
        createAccountFail: props<{ err: ToastrError}>(),
    }
})

export const {emailExistsStart, emailExistsFail, setEmailExists } = CHECK_EMAIL_EXISTS_ACTIONS
export const {createAccountStart, createAccountSuccess, createAccountFail} = CREATE_ACCOUNT_ACTIONS;



