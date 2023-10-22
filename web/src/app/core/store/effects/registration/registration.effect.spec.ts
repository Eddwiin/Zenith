import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import authServiceMock from "@zenith/app/shared/tests/services/auth-mock.service";
import * as RegistrationAction from "@zenith/core/store/actions/registration.action";
import { Observable, of, throwError } from "rxjs";
import { checkEmailExists$ } from "./registration.effect";

describe('Registration effect', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient()
            ]
        })
    })
    
    describe('checkEmailExists$', () => {
        let payload: string;
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            payload = 'test@example.fr'
            actionsMock$ = of(RegistrationAction.emailExistsStart({ payload })) 
        })

        it('should call checkEmailExists from authService when action is emailExistsStart', () => {
            const checkEmailExistSpy = spyOn(authServiceMock, 'checkEmailExists').and.callFake(() => of(false));

            checkEmailExists$(actionsMock$, authServiceMock).subscribe((action) => {
                expect(checkEmailExistSpy).toHaveBeenCalledOnceWith(payload);    
            })
        })   

        it('should call emailExistsSuccess action when checkEmailExists return 200', () => {
            checkEmailExists$(actionsMock$, authServiceMock).subscribe((action) => {
                expect(action).toEqual(RegistrationAction.emailExistsSuccess({ payload: false}))
            })
        })  


        it('should call createAccountFail action when checkEmailExists return error server', () => {
            const mockErrorResponse = new Error('error server')
            spyOn(authServiceMock, 'checkEmailExists').and.callFake(() => throwError(() => mockErrorResponse));

            checkEmailExists$(actionsMock$, authServiceMock).subscribe((action) => {
                expect(action).toEqual(RegistrationAction.emailExistsFail({ err: mockErrorResponse, statusCode: 500}))
            })
        }) 

    })
})



// import { provideHttpClient } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Action } from '@ngrx/store';
// import { AuthService } from '@zenith/core/services/auth/auth.service';
// import * as RegistrationAction from "@zenith/core/store/actions/registration.action";
// import { Observable, of } from 'rxjs';

// describe('Registration effect', () => {
//     let authService: AuthService;
//     let actions$: Observable<Action>;
    
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 provideHttpClient(),
//                 provideMockActions(() => actions$)
//             ],
//         });

//         authService = TestBed.inject(AuthService)
//     })

//     describe('checkEmailExists', () => {
//         it('should call checkEmailExists when action is emailExistsStart', () => {
//             const checkEmailExistsSpy = spyOn(authService, 'checkEmailExists').and.callFake(() => of(false));
//             const payload = 'test@test.fr';
//             actions$ = of(RegistrationAction.emailExistsStart({ payload }))

//         })
//     })
// })
