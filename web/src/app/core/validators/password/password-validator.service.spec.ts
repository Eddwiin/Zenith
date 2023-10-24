import { TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { PasswordValidatorService } from './password-validator.service';

describe('PasswordValidatorService', () => {
  let passwordValidatorService: PasswordValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    passwordValidatorService = TestBed.inject(PasswordValidatorService);
  });

  it('should be created', () => {
    expect(passwordValidatorService).toBeTruthy();
  });

  describe('checkIfPasswordRegexIsValid', () => {
    describe('When regex invalid', () => {
      const expected = { passwordInvalid: true }
  
      it("should return an error if the password doesn't contains at least one lowercase letter", () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('AZERTY123!')) as typeof expected ;
        expect(response).toEqual(expected);
      })
    
      it("should return an error if the password doesn't contains at least one uppercase letter", () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('azerty123!')) as typeof expected ;
    
        expect(response).toEqual(expected);
      })
    
      it("should return an error if the password doesn't contains at least one digit", () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('azertyAZERTY!')) as typeof expected ;
    
        expect(response).toEqual(expected);
      })
    
      it("should return an error if the password doesn't contains at least one special character", () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('azertyAZERTY123')) as typeof expected ;
    
        expect(response).toEqual(expected);
      })
    
      it("should return an error if the password contains least than 8 characters", () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('aA123!')) as typeof expected ;
    
        expect(response).toEqual(expected);
      })
    })
    
    describe('When regex valid', () => {
      it('should return null when password has at least one lowercase, one uppercase, one digit, one special characteres and greather or egal to 8 characters', () => {
        const response = passwordValidatorService.checkIfPasswordRegexIsValid(new FormControl('testAZERT123!')) as null;
  
        expect(response).toEqual(null);
      })
    })
  })
  
  describe('checkPasswordsAreTheSame', () => {
    it('should return an error when passwords are not the same', () => {
      const passwordCtrl = new FormControl('');
      const confirmationPasswordCtrl = new FormControl('');
      const fb = new FormGroup({ passwordCtrl, confirmationPasswordCtrl })
      fb.setValidators(passwordValidatorService.checkPasswordsAreTheSame('passwordCtrl', 'confirmationPasswordCtrl'))

      passwordCtrl.patchValue('testAZERT124!');
      confirmationPasswordCtrl.patchValue('testAZERT123!')

      expect(fb.hasError('passwordsAreNotTheSame')).toBeTrue();
    })

 
    it('should return null when passwords are the same', () => {
      const passwordCtrl = new FormControl('');
      const confirmationPasswordCtrl = new FormControl('');
      const fb = new FormGroup({ passwordCtrl, confirmationPasswordCtrl })
      fb.setValidators(passwordValidatorService.checkPasswordsAreTheSame('passwordCtrl', 'confirmationPasswordCtrl'))


      passwordCtrl.patchValue('testAZERT124!');
      confirmationPasswordCtrl.patchValue('testAZERT124!')
      
      expect(fb.hasError('passwordsAreNotTheSame')).toBeFalse();
    })
  })
});
