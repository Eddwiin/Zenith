import { TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { AuthValidatorService } from './auth-validator.service';

describe('AuthValidatorService', () => {
  let service: AuthValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('emailValidator', () => {
    const expectedRes = { emailInvalid: true };
    let ctrl = new FormControl('', AuthValidatorService.emailValidator());

    beforeEach(() => {
      ctrl.reset();
    })

    it('should return an error when "@" missing', () => {
      ctrl.setValue('john.doe.gmail.fr');
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it('should return an error when domain missing', () => {
      ctrl.setValue('john.doe@gmail');
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it('should return an error when there are no character before "@"', () => {
      ctrl.setValue('@gmail.fr');
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it('should return an error when domain is incorrect', () => {
      ctrl.setValue('john.doe@gmail.f');
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it('should return an error when top level domain start with a dot', () => {
      ctrl.setValue('john.doe@.fr');
      expect(ctrl.errors).toEqual(expectedRes);
    })
  });

  describe('passwordValidator', () => {
    const expectedRes = { passwordInvalid: true};
    const ctrl = new FormControl('', AuthValidatorService.passwordValidator());

    beforeEach(() => {
      ctrl.reset();
    })

    it("should return an error if password doesn't contains digit", () => {
      ctrl.setValue('Azerty!')
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it("should return an error if password doesn't contains capital letter", () => {
      ctrl.setValue('azerty123!')
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it("should return an error if password doesn't contains lowercase letter", () => {
      ctrl.setValue('AZERTY123!')
      expect(ctrl.errors).toEqual(expectedRes);
    })

    it("should return an error if password is inferior to 8 letters", () => {
      ctrl.setValue('az13')
      expect(ctrl.errors).toEqual(expectedRes);
    })
  });

  describe('Check passwords', () => {
    const passwordCtrl = new FormControl('');
    const confirmationPasswordCtrl = new FormControl('');
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = new FormGroup({
        password: passwordCtrl as FormControl<string>,
        confirmationPassword: confirmationPasswordCtrl as FormControl<string>
      }, {
        validators: [ AuthValidatorService.checkPasswordsHasSame('password', 'confirmationPassword')]
      });    
    })

    it('should return an error if passwords is not the same', () => {
      const expectedRes = { passwordIsNotSame: true };
      
      passwordCtrl.setValue('Azerty123');
      confirmationPasswordCtrl.setValue('Azerty456');

      expect(formGroup.errors).toEqual(expectedRes)
    })

    it('should throw an error when key is wrong', () => {
      formGroup.clearValidators();
      formGroup.setValidators(AuthValidatorService.checkPasswordsHasSame('wrongKey', 'confirmationPassword'))

      expect(() => passwordCtrl.setValue('Azerty123!')).toThrow(new Error('One of your key or both is wrong: firstKey: wrongKey, secondKey: confirmationPassword'))
    })
  })
});
