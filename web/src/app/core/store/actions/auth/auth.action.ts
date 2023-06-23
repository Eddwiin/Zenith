import { createAction, props } from "@ngrx/store";
import { Member } from "src/app/shared/models/Member";

export type SaveMember = Omit<Member, 'id' | 'conversations'>

export const START_SAVE_MEMBER = createAction('[SignUp Component] Start save member', props<{ payload: SaveMember}>());
export const LOAD_SAVE_MEMBER = createAction('[SignUp Component] Load save member', props<{ isLoading: boolean}>());
export const SUCCESS_SAVE_MEMBER = createAction('[SignUp Component] Success save member', props<{ success: any}>());
export const FAIL_SAVE_MEMBER = createAction('[SignUp Component] Fail save member', props<{ error: any }>());

