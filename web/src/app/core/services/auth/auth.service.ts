import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  checkEmailExists(email: string) {
    return this.http.get('api/auth/checkEmailExists').pipe(map(() => false), catchError(() => of(false)))
  }

  createAccount() {
    return this.http.post('api/auth/createAccount', null)
  }
}
