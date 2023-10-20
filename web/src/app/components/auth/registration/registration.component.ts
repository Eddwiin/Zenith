import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import PATH_CONFIG from 'src/app/core/enums/path.enum';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import * as EmailValidator from 'src/app/core/validators/email/email.validator';
import { PasswordValidatorService } from 'src/app/core/validators/password/password-validator.service';

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
  router = inject(Router);
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
    this.authService.createAccount()
    .pipe(takeUntil(this.destroyed))
    .subscribe({
      next: () => this.router.navigateByUrl(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`),
      error: () => this.router.navigateByUrl(`${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`)
    });
  }
}
