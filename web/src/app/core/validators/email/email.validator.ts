import { Injectable } from "@angular/core"
import { AbstractControl } from "@angular/forms"
import { map, of } from "rxjs"
import { AuthService } from "../../services/auth/auth.service"

@Injectable({
     providedIn: 'root'
})
export class EmailValidatorService {
     static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      checkIfEmailMatchWithRegex(emailControl: AbstractControl) {
          return EmailValidatorService.EMAIL_REGEX.test(emailControl.value) 
                    ? null : { emailFormatInvalid: true }
     }

     checkIfEmailExists(authService: AuthService) {
          return (control: AbstractControl) => {
               const emailValidatorIsInvalid = control.hasError('required');
               if (emailValidatorIsInvalid) return of(null);
               
               return authService.checkEmailExists(control.value).pipe(
                    map(isExist => isExist ? { emailExists: true } : null)
               )
          }
     }
}

