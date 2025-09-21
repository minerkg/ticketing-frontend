import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoginRequest, LoginResponse, RefreshResponse} from '../../models/auth/auth.models';
import {User} from '../../models/user';
import {AuthStore} from './auth-store';
import {ApiResponse} from '../../models/api-response';
import {PasswordChangeRequest} from '../../models/passwordChangeRequest';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly base = environment.apiBasePath;
  private readonly authPath = `${this.base}/user`;

  constructor(private readonly http: HttpClient, private authStore: AuthStore) {
  }


  login(dto: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.authPath}/login`, dto, {withCredentials: true})
      .pipe(tap(({accessToken, user}) => {
        this.authStore.setAccessToken(accessToken);
        this.authStore.setUser(user);
      }),
        catchError(error => {
          console.error('Failed to login', error);
          return throwError(() => error);
        })
      );
  }

  refresh() {
    return this.http.post<RefreshResponse>(`${this.authPath}/refresh`, {}, {withCredentials: true})
      .pipe(tap(({accessToken}) => {
        this.authStore.setAccessToken(accessToken);
      }));
  }

  me() {
    return this.http.get<User>(`${this.authPath}/me`, {withCredentials: true})
      .pipe(tap(user => this.authStore.setUser(user)));
  }

  logout() {
    return this.http.post<void>(`${this.authPath}/logout`, {}, {withCredentials: true})
      .pipe(tap(() => this.authStore.clear()));
  }


}
