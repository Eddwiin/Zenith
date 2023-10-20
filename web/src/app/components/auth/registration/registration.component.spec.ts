import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { importTranslateService } from 'src/app/app.config';
import { routes } from 'src/app/app.routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import RegistrationComponent from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [provideHttpClient(), provideRouter(routes), provideLocationMocks(), importTranslateService, provideMockStore({})]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    const harness = await RouterTestingHarness.create(); // [1]
    harness.detectChanges();
    fixture.detectChanges();
  });

  beforeEach(async () => {
    component.loginFormGroup.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login form group', () => {
    it('should init form group', () => {
      expect(component.loginFormGroup).toBeTruthy()
    })

    it('should contains firstNameCtrl', () => {
      expect(component.firstNameCtrl).toBeTruthy();
    })

    it('should contains lastNameCtrl', () => {
      expect(component.lastNameCtrl).toBeTruthy()
    })

    it('should contains emailCtrl', () => {
      expect(component.emailCtrl).toBeTruthy()
    })

    it('should contains passwordCtrl', () => {
      expect(component.passwordCtrl).toBeTruthy()
    })

    it('should contains confirmationPasswordCtrl', () => {
      expect(component.confirmationPasswordCtrl).toBeTruthy()
    })
  })

  describe('FirstNameCtrl', () => {
    it('should return an error when firstNameCtrl value is empty', () => {
      expect(component.firstNameCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when firstNameCtrl value is empty', () => {
      component.firstNameCtrl?.patchValue('t')
      expect(component.firstNameCtrl?.hasError('minlength')).toBeTrue();
    })

    it('should return valid firstNameCtrl when the value is egal or superior to 2 characters', () => {
      component.firstNameCtrl?.patchValue('test')
      expect(component.firstNameCtrl?.valid).toBeTrue();
    })
  })

  describe('LastNameCtrl', () => {
    it('should return an error when lastNameCtrl value is empty', () => {
      expect(component.lastNameCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when lastNameCtrl value is empty', () => {
      component.lastNameCtrl?.patchValue('t')
      expect(component.lastNameCtrl?.hasError('minlength')).toBeTrue();
    })

    it('should return valid lastNameCtrl when the value is egal or superior to 2 characters', () => {
      component.lastNameCtrl?.patchValue('test')
      expect(component.lastNameCtrl?.valid).toBeTrue();
    })
  })

  describe('emailCtrl', () => {
    it('should return an error when emailCtrl value is empty', () => {
      expect(component.emailCtrl?.hasError('required')).toBeTrue();
    })

    it('should return email error when emailCtrl value is john.doetest.fr', () => {
      component.emailCtrl?.patchValue('john.doetest.fr')

      expect(component.emailCtrl?.hasError('emailFormatInvalid')).toBeTrue();
    })

    it('should return email error when emailCtrl value is john.doe@test', () => {
      component.emailCtrl?.patchValue('john.doetest')

      expect(component.emailCtrl?.hasError('emailFormatInvalid')).toBeTrue();
    })

    it('should return emailExist error when emailCtrl value already exist in database', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists').and.callFake(() => of(true))
      const emailValue = 'john.doetest@test.fr';

      component.emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).toHaveBeenCalledWith(emailValue);
      expect(component.emailCtrl?.hasError('emailExists')).toBeTrue()
    })

    it('should not call checkEmailExists when emailCtrl is invalid', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists')
      const emailValue = 'john.doetesttest.fr';

      component.emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).not.toHaveBeenCalled();
      expect(component.emailCtrl?.hasError('emailExists')).toBeFalse()
    })

    it('should not contains emailExist error when email is not exist in database', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists').and.callFake(() => of(false))
      const emailValue = 'john.doetest@test.fr';

      component.emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).toHaveBeenCalled()
      expect(component.emailCtrl?.hasError('emailExists')).toBeFalse()
    })
  })


  describe('passwordCtrl', () => {
    it('should return an error when password is empty', () => {
      component.passwordCtrl?.patchValue('');
      
      expect(component.passwordCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when password is invalid', () => {
      component.passwordCtrl?.patchValue('azert1');
      
      expect(component.passwordCtrl?.hasError('passwordInvalid')).toBeTrue();
    })
  })

  describe('confirmationPasswordCtrl', () => {
    it('should return an error when confirmation password is empty', () => {
      component.confirmationPasswordCtrl?.patchValue('');
      
      expect(component.confirmationPasswordCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when confirmation password is invalid', () => {
      component.confirmationPasswordCtrl?.patchValue('azert1');
      expect(component.confirmationPasswordCtrl?.hasError('passwordInvalid')).toBeTrue();
    })
  })

  describe('loginFormGroup', () => {
    it('should return an error when passwords are not the same', () => {
      component.passwordCtrl?.patchValue('testAZERT124!');
      component.confirmationPasswordCtrl?.patchValue('testAZERT123!');

      expect(component.loginFormGroup?.hasError('passwordsAreNotTheSame')).toBeTrue();
    })
  })

  describe('OnSubmit', () => {
    beforeEach(() => {
      component.firstNameCtrl?.patchValue('John')
      component.lastNameCtrl?.patchValue('Doe')
      component.emailCtrl?.patchValue('john.doe@test.com')
      component.passwordCtrl?.patchValue('Azerty123!')
      component.confirmationPasswordCtrl?.patchValue('Azerty123!')
      fixture.detectChanges();
    })

    it('should disable submit button when loginFormGroup is invalid', () => {
      component.confirmationPasswordCtrl?.patchValue('Azert')
      fixture.detectChanges();
      const submitBtnEl = fixture.debugElement.query(By.css('[data-cy="submit-button-registration"]'))

      expect(submitBtnEl.nativeElement.disabled).toBeTrue();
    })

    it('should active submit button when loginFormGroup is valid', () => {
      const submitBtnEl = fixture.debugElement.query(By.css('[data-cy="submit-button-registration"]'))

      expect(submitBtnEl.nativeElement.disabled).toBeFalse();
    })

    it('should call createAccount from authService', () => {
      const createAccountSpy = spyOn(component.authService, 'createAccount').and.callFake(() => of(true))
      const formBtnEl = fixture.debugElement.query(By.css('[data-cy="loginFormGroup-registration"]'))

      formBtnEl.triggerEventHandler('ngSubmit', null);
      
      expect(createAccountSpy).toHaveBeenCalled();
    })
  })
});

