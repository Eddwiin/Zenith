import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {
  static readonly PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  
  checkIfPasswordRegexIsValid(passwordCtrl: AbstractControl) {    
    const passwordMatchWithRegex = PasswordValidatorService.PASSWORD_REGEX.test(passwordCtrl.value)
    return  passwordMatchWithRegex ? null :  { passwordInvalid: true}
  }

  checkPasswordsAreTheSame(passwordCtrlKey: string, confirmationPasswordCtrlKey: string) {
    return (control: AbstractControl) => {
      const passwordCtrl = control.get(passwordCtrlKey);
      const confirmationPasswordCtrl = control.get(confirmationPasswordCtrlKey);
      
      return (passwordCtrl?.value === confirmationPasswordCtrl?.value) ? null : { passwordsAreNotTheSame: true }
    }
  }

}
