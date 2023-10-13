import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkEmailExists(email: string) {
    return of(true)
  }
}
