import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SaveMember, START_SAVE_MEMBER } from 'src/app/core/store/actions/auth/auth.action';
import { AuthValidatorService } from 'src/app/shared/utils/validators/auth-validator.service';

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
  store = inject(Store);

  firstNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastNameCtrl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  emailCtrl = new FormControl('', [Validators.required, AuthValidatorService.emailValidator()]);
  passwordCtrl = new FormControl('', [Validators.required, AuthValidatorService.passwordValidator()]);
  confirmPasswordCtrl = new FormControl('', [Validators.required, AuthValidatorService.passwordValidator()]);

  signUpFB = new FormGroup<ISignUp>({
    [SignUpKeyForm.FirstName]: this.firstNameCtrl as FormControl<string>,
    [SignUpKeyForm.LastName]: this.lastNameCtrl as FormControl<string>,
    [SignUpKeyForm.Email]: this.emailCtrl as FormControl<string>,
    [SignUpKeyForm.Password]: this.passwordCtrl as FormControl<string>,
    [SignUpKeyForm.ConfirmPassword]: this.confirmPasswordCtrl as FormControl<string>
  }, {
    validators: [AuthValidatorService.checkPasswordsHasSame(SignUpKeyForm.Password, SignUpKeyForm.ConfirmPassword)]
  });

  onSubmit() {
    const saveMember: SaveMember = {
      firstName: this.firstNameCtrl.value as string,
      lastName: this.lastNameCtrl.value as string,
      email: this.emailCtrl.value as string,
      password: this.passwordCtrl.value as string
    }

    this.store.dispatch(START_SAVE_MEMBER({ payload: saveMember}));
  }
}
