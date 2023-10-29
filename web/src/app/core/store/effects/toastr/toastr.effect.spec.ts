// import { provideHttpClient } from "@angular/common/http";
// import { TestBed } from "@angular/core/testing";
// import { Action } from "@ngrx/store";
// import { TranslateService } from "@ngx-translate/core";
// import { importTranslateService } from "@zenith/app/app.config";
// import * as ToastrActions from "@zenith/core/store/actions/toastr.action";
// import { ToastrService, provideToastr } from "ngx-toastr";
// import { Observable, of } from "rxjs";
// import { toastrMessageError$, toastrMessageSuccess$ } from "./toastr.effect";

// describe('Toastr Effect', () => {
//     let translateService: TranslateService;
//     let toastrService: ToastrService

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 provideHttpClient(),
//                 importTranslateService,
//                 provideToastr()
//             ]
//         })

//         translateService = TestBed.inject(TranslateService);
//         toastrService = TestBed.inject(ToastrService);
//     })

//     describe('toastrMessageSucces$', () => {
//         let actionsMock$: Observable<Action>
//         let payload: ToastrActions.SuccessMessage;

//         beforeEach(() => {
//             payload = translateService.instant('AccountCreated')
//             actionsMock$ = of(ToastrActions.toastrMessageSuccess({ payload }))
//         })

//         it('should call instance from translate service', () => {
//             const instantSpy = spyOn(translateService, 'instant');

//             toastrMessageSuccess$(actionsMock$, translateService, toastrService).subscribe(() => {
//                 expect(instantSpy).toHaveBeenCalledWith('Succcess')
//                 expect(instantSpy).toHaveBeenCalledWith('AccountCreated')
//             })
//         })

//         it('should call success from toastr service', () => {
//             const successSpy = spyOn(toastrService, 'success');
//             const successTitle = translateService.instant('Succcess');
//             const successMessage = translateService.instant('AccountCreated')

//             toastrMessageSuccess$(actionsMock$, translateService, toastrService).subscribe(() => {
//                 expect(successSpy).toHaveBeenCalledWith(successMessage, successTitle);
//             })
//         })
//     })


//     describe('toastrMessageFail$', () => {
//         let actionsMock$: Observable<Action>
    
//         beforeEach(() => {
//             actionsMock$ = of(ToastrActions.toastrMessageError({
//                 err: {
//                     message: '',
//                 },
//                 statusCode: 500
//             }))
//         })

//         it('should call instance from translate service', () => {
//             const instantSpy = spyOn(translateService, 'instant');

//             toastrMessageError$(actionsMock$, translateService, toastrService).subscribe(() => {
//                 expect(instantSpy).toHaveBeenCalledWith('Error')
//                 expect(instantSpy).toHaveBeenCalledWith('SomethingWrong')
//             })
//         })

//         it('should call success from toastr service', () => {
//             const successSpy = spyOn(toastrService, 'error');
//             const errorTitle = translateService.instant('Error');
//             const errorMessage = translateService.instant('SomethingWrong')

//             toastrMessageError$(actionsMock$, translateService, toastrService).subscribe(() => {
//                 expect(successSpy).toHaveBeenCalledWith(errorMessage, errorTitle);
//             })
//         })

//     })
// })

