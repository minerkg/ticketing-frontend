import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/api-response';
import {User} from '../models/user';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserRegistrationRequest} from '../models/userRegistrationRequest';
import {UserDetailUpdate} from '../models/user-detail-update';
import {RoleUpdateRequest} from '../models/role-update-request';
import {PasswordChangeRequest} from '../models/passwordChangeRequest';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly localVarPath = `user`;
  protected readonly basePath = environment.apiBasePath;
  private readonly ticketingUserUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers() {
    const usersUrl = `${this.ticketingUserUrl}/all-users`;
    return this.httpClient
      .get<ApiResponse<User[]>>(usersUrl)
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load users', error);
          return of([]);
        })
      );
  }

  findUserById(userId: string | undefined) {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.id === userId) ?? undefined)
    );
  }

  findMyUsersDetail() {
    const usersUrl = `${this.ticketingUserUrl}/me`;
    return this.httpClient
      .get<ApiResponse<User>>(usersUrl)
      .pipe(
        map((response) => response.data ?? undefined),
        catchError((error) => {
          console.error('Failed to load users profile, error');
          return throwError(() => error);
        })
      );
  }


  registerNewUser(userRegistrationRequest: UserRegistrationRequest) {
    const registerUrl = `${this.ticketingUserUrl}/register`;
    return this.httpClient
      .post<ApiResponse<User>>(registerUrl, userRegistrationRequest)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to create new user', error);
          return throwError(() => error);
        })
      );
  }

  updateUserDetail(userDetailUpdate: UserDetailUpdate) {
    const registerUrl = `${this.ticketingUserUrl}/update-detail`;
    return this.httpClient
      .put<ApiResponse<User>>(registerUrl, userDetailUpdate)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to update user detail', error);
          return throwError(() => error);
        })
      );
  }

  updateUserRole(roleUpdateRequest: RoleUpdateRequest) {
    const registerUrl = `${this.ticketingUserUrl}/role`;
    return this.httpClient
      .put<ApiResponse<User>>(registerUrl, roleUpdateRequest)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to update users role', error);
          return throwError(() => error);
        })
      );
  }

  changePassword(request: PasswordChangeRequest): Observable<string> {
    return this.httpClient.put<ApiResponse<string>>(
      `${this.ticketingUserUrl}/change-password`,
      request
    ).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to change users password', error);
        return throwError(() => error);
      })
    );
  }


  toggleAccount(userId: string, accountEnabled: boolean) {
    const url = accountEnabled
      ? `${this.ticketingUserUrl}/enable`
      : `${this.ticketingUserUrl}/disable`;
    return this.httpClient.put<void>(url, JSON.stringify(userId),
      { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError(error => {
        console.error('Failed to change users account status', error);
        return throwError(() => error);
      })
    )
  }

}
