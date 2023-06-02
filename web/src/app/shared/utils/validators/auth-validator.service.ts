import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// should contain at least one digit
// should contain at least one lower case
// should contain at least one upper case
// should contain at least 8 from the mentioned characters
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

@Injectable({
  providedIn: 'root'
})
export class AuthValidatorService {

  constructor() { }

  static emailValidator() {
    return (control: AbstractControl) => {
      const emailValue = control.value;

      return (EMAIL_REGEX.test(emailValue)) ? null : { emailInvalid: true }
    }
  }

  static passwordValidator() {
    return (control: AbstractControl) => {
      const passwordValue = control.value;

      return (PASSWORD_REGEX.test(passwordValue)) ? null : { passwordInvalid: true}
    }
  }

  static checkPasswordsHasSame(firstCtrlKey: string, secondCtrlKey: string) {
    return (formGroup: AbstractControl) => {
      const firstCtrl = formGroup.get(firstCtrlKey);
      const secondCtrl = formGroup.get(secondCtrlKey);

      if (!firstCtrl || !secondCtrl) 
        throw new Error(`One of your key or both is wrong: firstKey: ${firstCtrlKey}, secondKey: ${secondCtrlKey}`)
      
      const hasPasswordInvalid = !!firstCtrl.errors?.['passwordInvalid'] || !!secondCtrl.errors?.['passwordInvalid'];
      
      return (!hasPasswordInvalid && firstCtrl.value !== secondCtrl.value) ? { passwordIsNotSame: true } : null
    }
  }
}
