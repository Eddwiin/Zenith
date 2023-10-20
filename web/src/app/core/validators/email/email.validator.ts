import { inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { first, map, of } from "rxjs";
import { emailExistsStart } from "../../store/actions/registration.action";
import { selectEmailExists } from "../../store/selectors/email.selector";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkIfEmailMatchWithRegex = (emailControl: AbstractControl) => {
     return EMAIL_REGEX.test(emailControl.value) ? null : { emailFormatInvalid: true }
}

export const checkIfEmailExists = (
          store = inject(Store)
     ) => {
     return (control: AbstractControl) => {
          const emailValidatorIsInvalid = control.invalid

          if (emailValidatorIsInvalid) return of(null);

          store.dispatch(emailExistsStart({ payload: control.value }))

          return store.select(selectEmailExists).pipe(
               map(isExist => isExist ? { emailExists: true } : null),
               first()
          )
     }
}