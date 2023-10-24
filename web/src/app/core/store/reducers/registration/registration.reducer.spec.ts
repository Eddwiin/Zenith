import * as RegistrationAction from '@zenith/core/store/actions/registration.action';
import { registrationReducer, RegistrationState } from './registration.reducer';

describe('Registration reducer', () => {
    let initialState: RegistrationState | {} = {}

    beforeEach(() => {
        initialState = {
            emailExists: false
        }
    });

    describe('emailExists', () => {
        it('should update emailExists state when emailExistsSuccess action is dispatched', () => {
            const action = RegistrationAction.emailExistsSuccess({ payload: true});
            const newState = registrationReducer(initialState as RegistrationState, action);

            expect(newState.emailExists).toBe(true);
        })
    })

})