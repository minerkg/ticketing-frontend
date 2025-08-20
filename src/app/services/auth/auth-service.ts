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
  readonly loggedInUser = signal<TicketingUserDto | null >(null);


  private authHeaders: HttpHeaders | null = null;
  private readonly tokenKey = 'authToken';
  private readonly userData = "userData"
  protected readonly basePath = environment.apiBasePath;


  constructor(private http: HttpClient, private router: Router) {
    // const storedAuth = localStorage.getItem(this.tokenKey);
    // const storedUser = localStorage.getItem(this.userData);
    // if (storedAuth) {
    //   this.setAuthHeaders(JSON.parse(storedAuth));
    //   if (typeof storedUser === "string") {
    //     this.loggedInUser.set(JSON.parse(storedUser));
    //   }
    //   this.loggedIn.set(true);
    // }
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
      tap((response) => {
        this.loggedInUser.set(response.data);
        this.loggedIn.set(true);
        // localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
        // localStorage.setItem(this.userData, JSON.stringify(response.data));
      }),
      map(() => true),
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
    // localStorage.removeItem(this.tokenKey);
    // localStorage.removeItem(this.userData);
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): HttpHeaders {
    return this.authHeaders ?? new HttpHeaders();
  }


}
