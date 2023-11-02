import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Store } from "@ngrx/store";
import { emailExistsStart } from "@zenith/core/store/actions/registration.action";
import { selectEmailExists } from "@zenith/core/store/selectors/email.selector";
import { debounceTime, first, map, of } from "rxjs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkIfEmailMatchWithRegex = (emailControl: AbstractControl) => {
     return EMAIL_REGEX.test(emailControl.value) ? null : { emailFormatInvalid: true }
}

export const checkIfEmailExists = (
          store = inject(Store)
     ): AsyncValidatorFn => {
     return (control: AbstractControl) => {
          if (control.invalid) return of(null);

          store.dispatch(emailExistsStart({ payload: control.value }))

          return store.select(selectEmailExists).pipe(
               debounceTime(1000),
               map(isExist => isExist ? { emailExists: true } : null),
               first()
          )
     }
}