import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login form group', () => {
    it('should init form group', () => {
      expect(component.loginFormGroup).toBeTruthy()
    })

    it('should contains firstNameCtrl', () => {
      expect(component.loginFormGroup.get('firstNameCtrl')).toBeTruthy();
    })

    it('should contains lastNameCtrl', () => {
      expect(component.loginFormGroup.get('lastNameCtrl')).toBeTruthy()
    })

    it('should contains emailCtrl', () => {
      expect(component.loginFormGroup.get('emailCtrl')).toBeTruthy()
    })

    it('should contains passwordCtrl', () => {
      expect(component.loginFormGroup.get('passwordCtrl')).toBeTruthy()
    })

    it('should contains confirmationPasswordCtrl', () => {
      expect(component.loginFormGroup.get('confirmationPasswordCtrl')).toBeTruthy()
    })
  })

  describe('FirstNameCtrl', () => {
    it('should return an error when firstNameCtrl value is empty', () => {
      const firstNameCtrl = component.loginFormGroup.get('firstNameCtrl');

      expect(firstNameCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when firstNameCtrl value is empty', () => {
      const firstNameCtrl = component.loginFormGroup.get('firstNameCtrl');
      firstNameCtrl?.patchValue('t')
      expect(firstNameCtrl?.hasError('minlength')).toBeTrue();
    })

    it('should return valid firstNameCtrl when the value is egal or superior to 2 characters', () => {
      const firstNameCtrl = component.loginFormGroup.get('firstNameCtrl');
      firstNameCtrl?.patchValue('test')
      expect(firstNameCtrl?.valid).toBeTrue();
    })
  })

  describe('LastNameCtrl', () => {
    it('should return an error when lastNameCtrl value is empty', () => {
      const lastNameCtrl = component.loginFormGroup.get('lastNameCtrl');

      expect(lastNameCtrl?.hasError('required')).toBeTrue();
    })

    it('should return an error when lastNameCtrl value is empty', () => {
      const lastNameCtrl = component.loginFormGroup.get('lastNameCtrl');
      lastNameCtrl?.patchValue('t')
      expect(lastNameCtrl?.hasError('minlength')).toBeTrue();
    })

    it('should return valid lastNameCtrl when the value is egal or superior to 2 characters', () => {
      const lastNameCtrl = component.loginFormGroup.get('lastNameCtrl');
      lastNameCtrl?.patchValue('test')
      expect(lastNameCtrl?.valid).toBeTrue();
    })
  })

  describe('emailCtrl', () => {
    it('should return an error when emailCtrl value is empty', () => {
      const emailCtrl = component.loginFormGroup.get('emailCtrl');

      expect(emailCtrl?.hasError('required')).toBeTrue();
    })

    it('should return email error when emailCtrl value is john.doetest.fr', () => {
      const emailCtrl = component.loginFormGroup.get('emailCtrl');
      emailCtrl?.patchValue('john.doetest.fr')

      expect(emailCtrl?.hasError('emailFormatInvalid')).toBeTrue();
    })

    it('should return email error when emailCtrl value is john.doe@test', () => {
      const emailCtrl = component.loginFormGroup.get('emailCtrl');
      emailCtrl?.patchValue('john.doetest')

      expect(emailCtrl?.hasError('emailFormatInvalid')).toBeTrue();
    })

    it('should return emailExist error when emailCtrl value already exist in database', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists').and.callFake(() => of(true))
      const emailCtrl = component.loginFormGroup.get('emailCtrl');
      const emailValue = 'john.doetest@test.fr';

      emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).toHaveBeenCalledOnceWith(emailValue);
      expect(emailCtrl?.hasError('emailExists')).toBeTrue()
    })

    it('should not call checkEmailExists when emailCtrl is invalid', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists')
      const emailCtrl = component.loginFormGroup.get('emailCtrl');
      const emailValue = 'john.doetesttest.fr';

      emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).not.toHaveBeenCalled();
      expect(emailCtrl?.hasError('emailExists')).toBeFalse()
    })

    it('should not contains emailExist error when email is not exist in database', () => {
      const emailExistSpy = spyOn(authService, 'checkEmailExists').and.callFake(() => of(false))
      const emailCtrl = component.loginFormGroup.get('emailCtrl');
      const emailValue = 'john.doetest@test.fr';

      emailCtrl?.patchValue(emailValue)

      expect(emailExistSpy).toHaveBeenCalled
      expect(emailCtrl?.hasError('emailExists')).toBeFalse()
    })
  })
});