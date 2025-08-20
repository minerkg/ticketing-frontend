import {Injectable, signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {ApiResponse} from '../../models/api-response';
import {environment} from '../../../environments/environment';
import {TicketingUserDto} from '../../models/ticketingUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  readonly loggedIn = signal(false);
  private loggedInUser = signal<TicketingUserDto | undefined >(undefined);
  readonly logedUser = this.loggedInUser.asReadonly();

  private authHeaders: HttpHeaders | null = null;
  private readonly tokenKey = 'authToken';
  protected readonly basePath = environment.apiBasePath;


  constructor(private http: HttpClient, private router: Router) {
    const storedAuth = localStorage.getItem(this.tokenKey);
    if (storedAuth) {
      this.setAuthHeaders(JSON.parse(storedAuth));
      this.loggedIn.set(true);
    }
  }

  private setAuthHeaders(credentials: { username: string, password: string }): void {
    const authString = `${credentials.username}:${credentials.password}`;
    const encodedAuth = btoa(authString);
    this.authHeaders = new HttpHeaders({
      Authorization: `Basic ${encodedAuth}`
    });
  }


  login(credentials: { username: string, password: string }): Observable<boolean> {
    this.setAuthHeaders(credentials);
    const loginUrl = `${this.basePath}/user/me`;
    return this.http.get<ApiResponse<TicketingUserDto>>(loginUrl, {headers: this.getAuthHeaders()}).pipe(
      map((response) => this.loggedInUser.set(response.data)),
      map(() => true),
      tap(() => {
        this.loggedIn.set(true);
        localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
      }),
      catchError(error => {
        console.log(error);
        this.loggedIn.set(false);
        this.authHeaders = null;
        return of(false);
      })
    );
  }

  logout(): void {
    this.loggedIn.set(false);
    this.authHeaders = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    return this.authHeaders ?? new HttpHeaders();
  }


}
