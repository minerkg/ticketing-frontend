import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/api-response';
import {User} from '../models/user';
import {catchError, map, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';
import {UserRegistrationRequest} from '../models/userRegistrationRequest';


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
      .get<ApiResponse<User[]>>(usersUrl, {headers: this.authService.getAuthHeaders()})
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
      .get<ApiResponse<User>>(usersUrl, {headers: this.authService.getAuthHeaders()})
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


}
