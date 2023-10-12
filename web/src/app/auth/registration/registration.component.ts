import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const LOGIN_FORM_KEYS = {
  firstNameCtrl: 'firstNameCtrl',
  lastNameCtrl: 'lastNameCtrl',
  emailCtrl: 'emailCtrl',
  passwordCtrl: 'passwordCtrl'
} as const;

@Component({
  selector: 'zth-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  loginFormGroup: FormGroup = new FormGroup({
    [LOGIN_FORM_KEYS.firstNameCtrl]: new FormControl(''),
    [LOGIN_FORM_KEYS.lastNameCtrl]: new FormControl(''),
    [LOGIN_FORM_KEYS.emailCtrl]: new FormControl(''),
    [LOGIN_FORM_KEYS.passwordCtrl]: new FormControl('')
  })
}
