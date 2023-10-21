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

const LOGIN_FORM_KEYS = {
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

  loginFormGroup: FormGroup = new FormGroup({
    [LOGIN_FORM_KEYS.firstNameCtrl]: this.firstNameCtrl,
    [LOGIN_FORM_KEYS.lastNameCtrl]: this.lastNameCtrl,
    [LOGIN_FORM_KEYS.emailCtrl]: this.emailCtrl,
    [LOGIN_FORM_KEYS.passwordCtrl]: this.passwordCtrl,
    [LOGIN_FORM_KEYS.confirmationPasswordCtrl]: this.confirmationPasswordCtrl
  }, {
    validators: [this.passwordValidor.checkPasswordsAreTheSame(LOGIN_FORM_KEYS.passwordCtrl, LOGIN_FORM_KEYS.confirmationPasswordCtrl)]
  })

  ngOnInit() {    
    this.destroyRef.onDestroy(() => {
      this.destroyed.next(null);
      this.destroyed.complete();
    })
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) return;

    const userToSave: UserWithoutId = {
      firstName: this.firstNameCtrl.getRawValue() as string,
      lastName: this.lastNameCtrl.getRawValue() as string,
      email: this.emailCtrl.getRawValue() as string,
      password: this.passwordCtrl.getRawValue() as string
    }

    this.store.dispatch(createAccountStart({ payload: userToSave}))
  }
}
