import * as RegistrationAction from '@zenith/core/store/actions/registration.action';
import { registrationReducer, RegistrationState } from './registration.reducer';

describe('Registration reducer', () => {
    let initialState: RegistrationState = { emailExists: false }

    beforeEach(() => {
        initialState = {
            emailExists: false
        }
    });

    describe('emailExists', () => {
        it('should update emailExists state when emailExistsSuccess action is dispatched', () => {
            const action = RegistrationAction.setEmailExists({ payload: true});
            const newState = registrationReducer(initialState as RegistrationState, action);

            expect(newState.emailExists).toBe(true);
        })
    })

})