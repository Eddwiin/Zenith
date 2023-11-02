import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { UserWithoutId } from '@zenith/core/models/user';
import { AuthService } from '@zenith/core/services/auth/auth.service';
import { createAccountStart } from '@zenith/core/store/actions/registration.action';
import * as EmailValidator from '@zenith/core/validators/email/email.validator';
import { PasswordValidatorService } from '@zenith/core/validators/password/password-validator.service';
import { Subject } from 'rxjs';

const REGISTRATION_FORM_KEYS = {
  firstNameCtrl: 'firstNameCtrl',
  lastNameCtrl: 'lastNameCtrl',
  emailCtrl: 'emailCtrl',
  passwordCtrl: 'passwordCtrl',
  confirmationPasswordCtrl: 'confirmationPasswordCtrl'
} as const;

@Component({
  selector: 'zth-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export default class RegistrationComponent implements OnInit{
  passwordValidor = inject(PasswordValidatorService);
  authService = inject(AuthService)
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();
  store = inject(Store)

  firstNameCtrl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)]
  })

  lastNameCtrl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)]
  })

  emailCtrl = new FormControl('', {
    validators: [Validators.required, EmailValidator.checkIfEmailMatchWithRegex],
    asyncValidators: [EmailValidator.checkIfEmailExists()]
  })

  passwordCtrl = new FormControl('', {
    validators: [Validators.required, this.passwordValidor.checkIfPasswordRegexIsValid]
  })

  confirmationPasswordCtrl = new FormControl('', {
    validators: [Validators.required, this.passwordValidor.checkIfPasswordRegexIsValid]
  })

  registrationFG: FormGroup = new FormGroup({
    [REGISTRATION_FORM_KEYS.firstNameCtrl]: this.firstNameCtrl,
    [REGISTRATION_FORM_KEYS.lastNameCtrl]: this.lastNameCtrl,
    [REGISTRATION_FORM_KEYS.emailCtrl]: this.emailCtrl,
    [REGISTRATION_FORM_KEYS.passwordCtrl]: this.passwordCtrl,
    [REGISTRATION_FORM_KEYS.confirmationPasswordCtrl]: this.confirmationPasswordCtrl
  }, {
    validators: [this.passwordValidor.checkPasswordsAreTheSame(REGISTRATION_FORM_KEYS.passwordCtrl, REGISTRATION_FORM_KEYS.confirmationPasswordCtrl)]
  })

  ngOnInit(){    
    this.destroyRef.onDestroy(() => {
      this.destroyed.next(null);
      this.destroyed.complete();
    })
  }

  onSubmit() {
    if (this.registrationFG.invalid) return;
    
    const userToSave = this.getUserFormatted(this.firstNameCtrl, this.lastNameCtrl, this.emailCtrl, this.passwordCtrl);
    this.store.dispatch(createAccountStart({ payload: userToSave}))
  }

  getUserFormatted(firstNameCtrl: FormControl, lastNameCtrl: FormControl, emailCtrl: FormControl, passwordCtrl: FormControl) {
    return {
      firstName: firstNameCtrl.getRawValue() as string,
      lastName: lastNameCtrl.getRawValue() as string,
      email: emailCtrl.getRawValue() as string,
      password: passwordCtrl.getRawValue() as string
    } as UserWithoutId
  }
}
