import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserWithoutId } from '@zenith/core/models/user';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  checkEmailExists(email: string) {
    return this.http.get<boolean>(`api/auth/checkEmailExists?email=${email}`).pipe(
        catchError(() => of(false))
      )
  }

  createAccount(userToSave: UserWithoutId) {
    return this.http.post<boolean>('api/auth/createAccount', userToSave)
  }
}
