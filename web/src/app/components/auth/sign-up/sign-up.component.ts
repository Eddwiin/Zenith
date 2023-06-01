import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

enum SignUpKeyForm {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword'
}

interface ISignUp {
  [SignUpKeyForm.FirstName]: FormControl<string>;
  [SignUpKeyForm.LastName]: FormControl<string>;
  [SignUpKeyForm.Email]: FormControl<string>;
  [SignUpKeyForm.Password]: FormControl<string>;
  [SignUpKeyForm.ConfirmPassword]: FormControl<string>;
}

@Component({
  selector: 'zth-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  firstNameCtrl = new FormControl('', [Validators.required]);
  lastNameCtrl = new FormControl('', [Validators.required]);
  emailCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required]);
  confirmPasswordCtrl = new FormControl('', [Validators.required]);

  signUpFB = new FormGroup<ISignUp>({
    [SignUpKeyForm.FirstName]: this.firstNameCtrl as FormControl<string>,
    [SignUpKeyForm.LastName]: this.lastNameCtrl as FormControl<string>,
    [SignUpKeyForm.Email]: this.emailCtrl as FormControl<string>,
    [SignUpKeyForm.Password]: this.passwordCtrl as FormControl<string>,
    [SignUpKeyForm.ConfirmPassword]: this.confirmPasswordCtrl as FormControl<string>
  });

  onSubmit() {
    console.log("ON SUBMIT", this.firstNameCtrl);
  }
}
