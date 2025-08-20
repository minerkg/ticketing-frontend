import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/api-response';
import {TicketingUserDto} from '../models/ticketingUserDto';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected readonly basePath = environment.apiBasePath;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllUsers() {
    const usersUrl = `${this.basePath}/user/all-users`;
    return this.http
      .get<ApiResponse<TicketingUserDto[]>>(usersUrl, {headers: this.authService.getAuthHeaders()})
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load users', error);
          return of([]);
        })
      );
  }


}
