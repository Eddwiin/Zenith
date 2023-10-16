import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EmailValidatorService } from 'src/app/core/validators/email/email.validator';
import { PasswordValidatorService } from 'src/app/core/validators/password/password-validator.service';

const  LOGIN_FORM_KEYS = {
  firstNameCtrl: 'firstNameCtrl',
  lastNameCtrl: 'lastNameCtrl',
  emailCtrl: 'emailCtrl',
  passwordCtrl: 'passwordCtrl',
  confirmationPasswordCtrl: 'confirmationPasswordCtrl'
} as const;

@Component({
  selector: 'zth-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  emailValidator = inject(EmailValidatorService)
  passwordValidor = inject(PasswordValidatorService);
  authService = inject(AuthService)
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();

  firstNameCtrl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)]
  })

  lastNameCtrl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)]
  })

  emailCtrl = new FormControl('', {
    validators: [this.emailValidator.checkIfEmailMatchWithRegex],
    asyncValidators: [this.emailValidator.checkIfEmailExists(inject(AuthService))]
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
    this.authService.createAccount()
    .pipe(takeUntil(this.destroyed))
    .subscribe();
  }

}
