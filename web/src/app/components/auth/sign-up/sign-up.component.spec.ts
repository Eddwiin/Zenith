import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignUpComponent]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("FormControl", () => {
    
    describe("firstNameCtrl", () => {
      it('should create firstNameCtrl', () => {
        expect(component.firstNameCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.firstNameCtrl.setValue('');
        expect(component.firstNameCtrl.hasValidator(Validators.required)).toBeTrue();
      })

      it('should return an error when first name has one letter', () => {
        const expectedRes = {requiredLength: 2, actualLength: 1};
        component.firstNameCtrl.setValue('J');
        expect(component.firstNameCtrl.errors?.['minlength']).toEqual(expectedRes);
      })
    })

    describe("lastNameCtrl", () => {
      it('should create lastNameCtrl', () => {
        expect(component.lastNameCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.lastNameCtrl.setValue('');
        expect(component.lastNameCtrl.hasValidator(Validators.required)).toBeTrue()
      });


      it('should return an error when last name has one letter', () => {
        const expectedRes = {requiredLength: 2, actualLength: 1};
        component.lastNameCtrl.setValue('D');
        expect(component.lastNameCtrl.errors?.['minlength']).toEqual(expectedRes);
      })
    })

    describe("emailCtrl", () => {
      it('should create emailCtrl', () => {
        expect(component.emailCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.emailCtrl.setValue('');
        expect(component.emailCtrl.hasValidator(Validators.required)).toBeTrue()
      })

      it('should implement emailValidator from AuthValidatorService', () => {
        const expectedRes = { emailInvalid: true };
        component.emailCtrl.setValue('john.doetest.fr');
        expect(component.emailCtrl.errors).toEqual(expectedRes);
      })
    })

    describe("passwordCtrl", () => {
      it('should create passwordCtrl', () => {
        expect(component.passwordCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.passwordCtrl.setValue('');
        expect(component.passwordCtrl.hasValidator(Validators.required)).toBeTrue()
      })

      it("should return an error if password doesn't respect passwordValidator", () => {
        const expectedRes = { passwordInvalid: true }
        component.passwordCtrl.setValue('azer12');
        expect(component.passwordCtrl.errors).toEqual(expectedRes)
      })
    })

    describe("confirmPasswordCtrl", () => {
      it('should create confirmPasswordCtrl', () => {
        expect(component.confirmPasswordCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.passwordCtrl.setValue('');
        expect(component.confirmPasswordCtrl.hasValidator(Validators.required)).toBeTrue()
      })

      it("should return an error if password doesn't respect passwordValidator", () => {
        const expectedRes = { passwordInvalid: true }
        component.passwordCtrl.setValue('azer12');
        expect(component.passwordCtrl.errors).toEqual(expectedRes)
      })
    })
  });

  describe('FormGroup', () => {
    it('should return an error when passwords is not the same', () => {
      const expectedRes = { passwordIsNotSame: true }
      component.passwordCtrl.setValue('Azerty123');
      component.confirmPasswordCtrl.setValue('Azerty456')

      expect(component.signUpFB.errors).toEqual(expectedRes);
    })
  })

  describe("onSubmit", () => {

    it("should return an error message when user has not been saved", () => {
      
    });
  });
});
