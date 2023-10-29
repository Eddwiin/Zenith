import { createActionGroup, props } from "@ngrx/store";
import { ToastrError } from "@zenith/core/models/toastr-error";

export type SuccessMessage = { message: string };

export const TOASTR_MESSAGE_ACTION = createActionGroup({
    source: 'TOASTR_MESSAGE',
    events: {
        toastrMessageSuccess: props<{ payload: SuccessMessage }>(),
        toastrMessageError: props<{ err: ToastrError}>()
    }
})

export const { toastrMessageSuccess, toastrMessageError} = TOASTR_MESSAGE_ACTION