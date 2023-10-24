import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const TOASTR_MESSAGE_ACTION = createActionGroup({
    source: 'TOASTR_MESSAGE',
    events: {
        toastrMessageSuccess: emptyProps(),
        toastrMessageError: props<{ err: unknown }>()
    }
})

export const { toastrMessageSuccess, toastrMessageError} = TOASTR_MESSAGE_ACTION