import { ComponentFixture, TestBed } from '@angular/core/testing';

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
        expect(component.firstNameCtrl.getError('required')).toBeTrue();
      })
    })

    describe("lastNameCtrl", () => {
      it('should create lastNameCtrl', () => {
        expect(component.lastNameCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.lastNameCtrl.setValue('');
        expect(component.lastNameCtrl.getError('required')).toBeTrue()
      })
    })

    describe("emailCtrl", () => {
      it('should create emailCtrl', () => {
        expect(component.emailCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.emailCtrl.setValue('');
        expect(component.emailCtrl.getError('required')).toBeTrue()
      })
    })

    describe("passwordCtrl", () => {
      it('should create passwordCtrl', () => {
        expect(component.passwordCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.passwordCtrl.setValue('');
        expect(component.passwordCtrl.getError('required')).toBeTrue()
      })
    })

    describe("confirmPasswordCtrl", () => {
      it('should create confirmPasswordCtrl', () => {
        expect(component.confirmPasswordCtrl).toBeTruthy();
      })

      it('should invalid formControl when is empty', () => {
        component.passwordCtrl.setValue('');
        expect(component.confirmPasswordCtrl.getError('required')).toBeTrue()
      })
    })
  })
});
