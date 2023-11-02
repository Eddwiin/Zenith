import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";
import { Action } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { importTranslateService } from "@zenith/app/app.config";
import { routes } from "@zenith/app/app.routes";
import AuthServiceMock from "@zenith/app/shared/tests/services/auth-mock.service";
import { MockErrorApi } from "@zenith/app/shared/tests/utils/mock-http-response";
import PATH_CONFIG from "@zenith/core/enums/path.enum";
import { ToastrError } from "@zenith/core/models/toastr-error";
import { UserWithoutId } from "@zenith/core/models/user";
import * as RegistrationActions from "@zenith/core/store/actions/registration.action";
import * as ToastrActions from "@zenith/core/store/actions/toastr.action";
import { Observable, of, throwError } from "rxjs";
import { checkEmailExists$, checkEmailExistsFail$, createAccount$, createAccountFail$, createAccountSuccess$ } from "./registration.effect";

describe('Registration effect', () => {
    let router: Router;
    let authServiceMock: AuthServiceMock
    let translateService: TranslateService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes),
                provideHttpClient(),
                importTranslateService,
                AuthServiceMock
            ]
        })

        router = TestBed.inject(Router);
        authServiceMock = TestBed.inject(AuthServiceMock);
        translateService = TestBed.inject(TranslateService)
    })
    
    describe('checkEmailExists$', () => {
        let payload: string;
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            payload = 'test@example.fr'
            actionsMock$ = of(RegistrationActions.emailExistsStart({ payload })) 
        })

        it('should call checkEmailExists from authService when action is emailExistsStart', () => {
            const checkEmailExistSpy = spyOn(authServiceMock, 'checkEmailExists').and.callFake(() => of(false));

            checkEmailExists$(actionsMock$, authServiceMock, translateService).subscribe(() => {
                expect(checkEmailExistSpy).toHaveBeenCalledOnceWith(payload);    
            })
        })   

        it('should call emailExistsSuccess action when checkEmailExists return 200', () => {
            checkEmailExists$(actionsMock$, authServiceMock, translateService).subscribe((action) => {
                expect(action).toEqual(RegistrationActions.setEmailExists({ payload: false}))
            })
        })  

        it('should call emailExistsFail action when checkEmailExists return error server', () => {
            const mockErrorApi: MockErrorApi = {
                err: null,
                status: 500
            }

            spyOn(authServiceMock, 'checkEmailExists').and.callFake(() => throwError(() => mockErrorApi));

            checkEmailExists$(actionsMock$, authServiceMock, translateService).subscribe((action) => {
                const mockErrorResponse: ToastrError = {
                    message: translateService.instant('SomethingWrong'),
                    statusCode: 500
                };
                expect(action).toEqual(RegistrationActions.emailExistsFail({ err: mockErrorResponse }))
            })
        }) 

    })

    describe('checkEmailExistsFail', () => {
        let toastrError: ToastrError;
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            toastrError = {
               statusCode: 500
            }
            actionsMock$ = of(RegistrationActions.emailExistsFail({ err: toastrError }))
        })

        it('should call toastrMessageError with toastrError ', () => {
            checkEmailExistsFail$(actionsMock$).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageError({ err: toastrError}))
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

            actionsMock$ = of(RegistrationActions.createAccountStart({ payload }))
        })
        
        it('should call createAccount from authService when action is createAccountStart', () => {
            const createAccountSpy = spyOn(authServiceMock, 'createAccount').and.callFake(() => of(true))

            createAccount$(actionsMock$, authServiceMock).subscribe(() => {
                expect(createAccountSpy).toHaveBeenCalledOnceWith(payload);
            })
        })

        it('should call createAccountSuccess when the account is created', () => {
            spyOn(authServiceMock, 'createAccount').and.callFake(() => of(true))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                expect(action).toEqual(RegistrationActions.createAccountSuccess())
            })
        })

        it('should call createAccountFail when the account is not created', () => {
            spyOn(authServiceMock, 'createAccount').and.callFake(() => of(false))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                const toastrError: ToastrError = { statusCode: 422 }
                expect(action).toEqual(RegistrationActions.createAccountFail({ err: toastrError }))
            })
        })

        it('should call createAccountFail when there is an error server', () => {
            const mockErrorAPI: MockErrorApi = {
                err: null,
                status: 500
            }
            spyOn(authServiceMock, 'createAccount').and.callFake(() => throwError(() => mockErrorAPI))

            createAccount$(actionsMock$, authServiceMock).subscribe(action => {
                const toastrError: ToastrError = { message: undefined, statusCode: 500 }
                expect(action).toEqual(RegistrationActions.createAccountFail({ err: toastrError }))
            })
        })
    })

    describe('createAccountSuccess$', () => {
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            actionsMock$ = of(RegistrationActions.createAccountSuccess())
        })

        it('should call toast service with success message', () => {
            createAccountSuccess$(actionsMock$,router, translateService).subscribe((action) => {
                const successMessage = translateService.instant('AccountCreated')
                expect(action).toEqual(ToastrActions.toastrMessageSuccess({ payload: { message: successMessage}}))
            })
        })

        it('should redirect to login page', () => {
            const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

            createAccountSuccess$(actionsMock$,router, translateService).subscribe(() => {
                expect(navigateByUrlSpy).toHaveBeenCalledOnceWith(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`)    
            })
        })
    })


    describe('createAccountFail$', () => {
        let actionsMock$: Observable<Action>;

        beforeEach(() => {
            actionsMock$ = of(RegistrationActions.createAccountFail({
                err: {
                    statusCode: 500
                }
            }))
        })

        it('should call toastrMessageError action', () => {
            createAccountFail$(actionsMock$).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageError(action))
            })
        })
    })
})

