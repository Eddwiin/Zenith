import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../../configs/api.config';
import { SaveMember } from '../../store/actions/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  apiConfigToken = inject(API_BASE_URL);

  saveMember(saveMember: SaveMember) {
    return this.http.post(`${this.apiConfigToken}/v1/auth/save`, saveMember)
  }
}
