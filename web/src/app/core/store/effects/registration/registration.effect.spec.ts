import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";
import { Action } from "@ngrx/store";
import { importTranslateService } from "@zenith/app/app.config";
import { routes } from "@zenith/app/app.routes";
import authServiceMock from "@zenith/app/shared/tests/services/auth-mock.service";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { UserWithoutId } from "@zenith/core/models/user";
import * as RegistrationAction from "@zenith/core/store/actions/registration.action";
import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
import { provideToastr } from "ngx-toastr";
import { Observable, of, throwError } from "rxjs";
import { checkEmailExists$, createAccount$, createAccountFail$, createAccountSuccess$ } from "./registration.effect";

describe('Registration effect', () => {
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes),
                provideHttpClient(),
                provideToastr(),
                importTranslateService
            ]
        })

        router = TestBed.inject(Router);
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

            checkEmailExists$(actionsMock$, authServiceMock).subscribe(() => {
                expect(checkEmailExistSpy).toHaveBeenCalledOnceWith(payload);    
            })
        })   

        it('should call emailExistsSuccess action when checkEmailExists return 200', () => {
            checkEmailExists$(actionsMock$, authServiceMock).subscribe((action) => {
                expect(action).toEqual(RegistrationAction.emailExistsSuccess({ payload: false}))
            })
        })  


        it('should call createAccountFail action when checkEmailExists return error server', () => {
            const mockErrorResponse = new Error('Error server')
            spyOn(authServiceMock, 'checkEmailExists').and.callFake(() => throwError(() => mockErrorResponse));

            checkEmailExists$(actionsMock$, authServiceMock).subscribe((action) => {
                expect(action).toEqual(RegistrationAction.emailExistsFail({ err: mockErrorResponse, statusCode: 500}))
            })
        }) 

    })


    describe('createAccount$', () => {
        let payload: UserWithoutId;
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            payload = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'Azerty123!'
            }

            actionsMock$ = of(RegistrationAction.createAccountStart({ payload }))
        })
        it('should call createAccount from authService when action is createAccountStart', () => {
            const createAccountSpy = spyOn(authServiceMock, 'createAccount').and.callFake(() => of(true))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                expect(createAccountSpy).toHaveBeenCalledOnceWith(payload);
            })
        })

        it('should call createAccountSuccess when the account is created', () => {
            spyOn(authServiceMock, 'createAccount').and.callFake(() => of(true))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                expect(action).toEqual(RegistrationAction.createAccountSuccess())
            })
        })

        it('should call createAccountFail when the account is not created', () => {
            spyOn(authServiceMock, 'createAccount').and.callFake(() => of(false))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                expect(action).toEqual(RegistrationAction.createAccountFail({ err: { isCreated: false }, statusCode: 500}))
            })
        })

        it('should call createAccountFail when there is an error server', () => {
            const mockErrorResponse = new Error('Error server')
            spyOn(authServiceMock, 'createAccount').and.callFake(() => throwError(() => mockErrorResponse))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                expect(action).toEqual(RegistrationAction.createAccountFail({ err: mockErrorResponse, statusCode: 500}))
            })
        })
    })

    describe('createAccountSuccess$', () => {
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            actionsMock$ = of(RegistrationAction.createAccountSuccess())
        })

        it('should call toast service with success message', () => {
            createAccountSuccess$(actionsMock$,router).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageSuccess())
            })
        })

        it('should redirect to login page', () => {
            const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

            createAccountSuccess$(actionsMock$,router).subscribe(() => {
                expect(navigateByUrlSpy).toHaveBeenCalledOnceWith(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`)    
            })
        })
    })


    describe('createAccountFail$', () => {
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            actionsMock$ = of(RegistrationAction.createAccountFail({ err: null, statusCode: 500}))
        })

        it('should call toastrMessageError action', () => {
            createAccountFail$(actionsMock$).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageError({ err: action.err}))
            })
        })
    })
})

