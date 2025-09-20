import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/api-response';
import {User} from '../models/user';
import {catchError, map, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';
import {UserRegistrationRequest} from '../models/userRegistrationRequest';
import {UserDetailUpdate} from '../models/user-detail-update';
import {RoleUpdateRequest} from '../models/role-update-request';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly localVarPath = `user`;
  protected readonly basePath = environment.apiBasePath;
  private readonly ticketingUserUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
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






}
