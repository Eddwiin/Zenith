import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ErrorAPI } from '@zenith/core/models/error-api';
import { PickUserEmailAndPassword, UserWithoutId } from '@zenith/core/models/user';
import { LoginSuccessResponse } from '@zenith/core/store/actions/login.action';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  checkEmailExists(email: string) {
    return this.http.get<boolean | ErrorAPI>(`api/auth/checkEmailExists?email=${email}`).pipe(
        map(isExists => isExists),
        catchError((err: ErrorAPI) => of(true)),
      )
  }

  createAccount(userToSave: UserWithoutId) {
    return this.http.post<boolean>('api/auth/createAccount', userToSave)
  }

  login(user: PickUserEmailAndPassword) {
    return this.http.post<LoginSuccessResponse>('api/auth/login', user);
  }
}
