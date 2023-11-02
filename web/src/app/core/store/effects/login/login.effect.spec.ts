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
import { PickUserEmailAndPassword } from "@zenith/core/models/user";
import * as LoginActions from '@zenith/core/store/actions/login.action';
import { LoginSuccessResponse } from "@zenith/core/store/actions/login.action";
import * as ToastrActions from '@zenith/core/store/actions/toastr.action';
import { Observable, of, throwError } from "rxjs";
import { login$, loginFail$, loginSuccess$ } from "./login.effect";

describe('Login Effect', () => {
    let actionsMock$: Observable<Action>
    let authServiceMock: AuthServiceMock;
    let translateService: TranslateService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideRouter(routes),
                importTranslateService,
                AuthServiceMock
            ]
        })

        authServiceMock = TestBed.inject(AuthServiceMock)
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router)
    })


    describe('login$', () => {
        let payload: PickUserEmailAndPassword;
        const mockLoginSuccessResponse: LoginSuccessResponse = {
            token: ''
        }

        beforeEach(() => {
            payload = { email: 'test@example.fr', password: 'Azerty123!'}
            actionsMock$ = of(LoginActions.loginStart({ payload }))
        });

        it('should call login when loginStart is called', () => {
            const loginSpy = spyOn(authServiceMock, 'login').and.callFake(() => of({ token: ''}));

            login$(actionsMock$, authServiceMock, translateService).subscribe(() => {
                expect(loginSpy).toHaveBeenCalledOnceWith(payload)
            })
        })

        it('should call loginSuccess action if the server return 200', () => {
            login$(actionsMock$, authServiceMock, translateService).subscribe((action) => {
                expect(action).toEqual(LoginActions.loginSuccess({ payload: mockLoginSuccessResponse }))
            })
        })

        it('should call loginFail when the server return an error', () => {
            const expectedErrorMessage = translateService.instant('ErrorConnection');
            const mockErrorAPI: MockErrorApi = {
                err: {
                    message: expectedErrorMessage
                },
                status: 401
            }

            spyOn(authServiceMock, 'login').and.callFake(() => throwError(() => mockErrorAPI));

            login$(actionsMock$, authServiceMock, translateService).subscribe((action) => {
                const mockErrorResponse: ToastrError = {
                    message: expectedErrorMessage,
                    statusCode: 401
                };

                expect(action).toEqual(LoginActions.loginFail({ err: mockErrorResponse}))
            })
        })
    })

    describe('loginSuccess$', () => {
        let payload: LoginSuccessResponse;

        beforeEach(() => {
            payload = { token: '1234'}
            actionsMock$ = of(LoginActions.loginSuccess({ payload }));
        })

        it('should call toastr message success action', () => {
            const successMessage = translateService.instant('SuccessfulConnection');

            loginSuccess$(actionsMock$, translateService, router).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageSuccess({ payload: { message: successMessage}}))
            })
        })

        it('should redirect to home page', () => {
            const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

            loginSuccess$(actionsMock$, translateService, router).subscribe(() => {
                expect(navigateByUrlSpy).toHaveBeenCalledOnceWith(PATH_CONFIG.HOME)
            })
        })
    })

    describe('loginFail$', () => {
        let expectedMessage: string;

        beforeEach(() => {
            expectedMessage = translateService.instant('ErrorConnection');

            actionsMock$ = of(LoginActions.loginFail({
                err: {
                    message: expectedMessage,
                    statusCode: 401
                }
            }));
        })

        it('should call toastr message error action', () => {
            const expectedToastrError: ToastrError = {
                message: expectedMessage,
                statusCode: 401
            }

            loginFail$(actionsMock$).subscribe((action) => {
                expect(action).toEqual(ToastrActions.toastrMessageError({ err: expectedToastrError }))
            })
        })
    })
})