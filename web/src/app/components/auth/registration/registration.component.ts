import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EmailValidatorService } from 'src/app/core/validators/email.validator';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  emailValidator = inject(EmailValidatorService)
  formKeys = { ...LOGIN_FORM_KEYS};
  
  loginFormGroup: FormGroup = new FormGroup({
    [LOGIN_FORM_KEYS.firstNameCtrl]: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    [LOGIN_FORM_KEYS.lastNameCtrl]: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    [LOGIN_FORM_KEYS.emailCtrl]: new FormControl('', {
      validators: [Validators.required, this.emailValidator.checkIfEmailMatchWithRegex],
      asyncValidators: [this.emailValidator.checkIfEmailExists(inject(AuthService))]
    }),
    [LOGIN_FORM_KEYS.passwordCtrl]: new FormControl(''),
    [LOGIN_FORM_KEYS.confirmationPasswordCtrl]: new FormControl('')
  })
}
