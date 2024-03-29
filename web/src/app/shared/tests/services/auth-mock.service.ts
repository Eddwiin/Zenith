import { Injectable } from '@angular/core';
import { ErrorAPI } from '@zenith/core/models/error-api';
import { PickUserEmailAndPassword, UserWithoutId } from "@zenith/core/models/user";
import { AuthService } from "@zenith/core/services/auth/auth.service";
import { Observable, of } from "rxjs";

@Injectable()
export default class AuthServiceMock extends AuthService {
    override checkEmailExists(email: string): Observable<boolean  | ErrorAPI> {
        return of(false);
    }

    override createAccount(user: UserWithoutId) {
        return of(true)
    }

    override login(user: PickUserEmailAndPassword) {
        return of({ token: ''})
    }
}
