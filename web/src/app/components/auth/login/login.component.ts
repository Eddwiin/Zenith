import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PickUserEmailAndPassword } from '@zenith/core/models/user';
import { loginStart } from '@zenith/core/store/actions/login.action';
import * as EmailValidator from '@zenith/core/validators/email/email.validator';

const LOGIN_KEYS = {
  emailCtrl: "emailCtrl",
  passwordCtrl: "passwordCtrl"
} as const;

@Component({
  selector: 'zth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  store = inject(Store)

  emailCtrl = new FormControl('', [Validators.required, EmailValidator.checkIfEmailMatchWithRegex]);
  passwordCtrl = new FormControl('', [Validators.required])
  loginFG = new FormGroup({
    [LOGIN_KEYS.emailCtrl]: this.emailCtrl,
    [LOGIN_KEYS.passwordCtrl]: this.passwordCtrl
  })

  onSubmit() {
    if(this.loginFG.invalid) return;
    
    const payload: PickUserEmailAndPassword = {
      email: this.emailCtrl.getRawValue() as string,
      password: this.passwordCtrl.getRawValue() as string

    }

    this.store.dispatch(loginStart({ payload }))
  }
}
