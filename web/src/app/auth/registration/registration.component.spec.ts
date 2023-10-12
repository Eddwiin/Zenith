import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login form group', () => {
    it('should init form group', () => {
      expect(component.loginFormGroup).toBeTruthy()
    })

    it('should contains firstNameCtrl', () => {
      expect(component.loginFormGroup.get('firstNameCtrl')).toBeTruthy();
    })

    it('should contains lastNameCtrl', () => {
      expect(component.loginFormGroup.get('lastNameCtrl')).toBeTruthy()
    })

    it('should contains emailCtrl', () => {
      expect(component.loginFormGroup.get('emailCtrl')).toBeTruthy()
    })
  })
});
