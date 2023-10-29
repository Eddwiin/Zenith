import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PickUserEmailAndPassword } from '@zenith/core/models/user';
import { loginStart } from '@zenith/core/store/actions/login.action';
import { registrationReducer } from '@zenith/core/store/reducers/registration/registration.reducer';
import * as EmailValidator from '@zenith/core/validators/email/email.validator';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;
  const initialState = {
    registration: registrationReducer
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();

    component.loginFG.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create loginFG', () => {
    expect(component.loginFG).toBeTruthy();
  })

  it('should create emailCtrl', () => {
    expect(component.emailCtrl).toBeTruthy();
  })

  it('should create passwordCtrl', () => {
    expect(component.passwordCtrl).toBeTruthy();
  })

  it('should contains emailCtrl in loginFG', () => {
    expect(component.loginFG.get('emailCtrl')).toBeTruthy()
  })

  it('should contains passwordCtrl in loginFG', () => {
    expect(component.loginFG.get('passwordCtrl')).toBeTruthy()
  })

  describe('emailCtrl', () => {
    it('should contains required validator', () => {
      expect(component.emailCtrl.hasValidator(Validators.required)).toBeTrue()
    })

    it('should contains emailValidator', () => {
      expect(component.emailCtrl.hasValidator(EmailValidator.checkIfEmailMatchWithRegex)).toBeTrue()
    })
  })

  describe('passwordCtrl', () => {
    it('should contains required validator', () => {
      expect(component.passwordCtrl.hasValidator(Validators.required)).toBeTrue()
    })
  })

  describe('OnSubmit', () => {
    it('should disable btn if loginFG is invalid', () => {
      const submitBtnEl = fixture.debugElement.query(By.css('[data-cy="submit-button-login"]'))
      expect(submitBtnEl.nativeElement.disabled).toBeTrue();
    })

    it('should enable btn if loginFG is valid', () => {
      component.emailCtrl.patchValue('test@example.com');
      component.passwordCtrl.patchValue('Azerty123!');
      
      fixture.detectChanges();

      const submitBtnEl = fixture.debugElement.query(By.css('[data-cy="submit-button-login"]'))
      expect(submitBtnEl.nativeElement.disabled).toBeFalse();
    })

    it('should call start loginStart', () => {
      const emailValue = 'test@example.com';
      const passwordValue = 'Azerty123!';
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      const expected: PickUserEmailAndPassword = {
        email: emailValue,
        password: passwordValue
      }
      component.emailCtrl.patchValue('test@example.com');
      component.passwordCtrl.patchValue('Azerty123!');

      const formEl = fixture.debugElement.query(By.css('[data-cy="form-group-login"]'));
      formEl.triggerEventHandler('ngSubmit', null);

      expect(dispatchSpy).toHaveBeenCalledWith(loginStart({ payload: expected }))
    })
  })
});
