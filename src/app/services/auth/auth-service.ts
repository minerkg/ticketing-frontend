import {computed, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ApiResponse} from '../../models/api-response';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly loggedIn = signal(false);
  readonly loggedInUser = signal<User | undefined>(undefined);
  readonly loggedInUserIsAdmin = computed(() => this.loggedInUser()?.userRole === User.UserRoleEnum.Admin);
  readonly loggedInUserRole = computed(() => this.loggedInUser()?.userRole);


  private authHeaders: HttpHeaders | null = null;
  private readonly tokenKey = 'authToken';
  private readonly userData = "userData"
  protected readonly basePath = environment.apiBasePath;


  constructor(private http: HttpClient) {
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
    return this.http.get<ApiResponse<User>>(loginUrl, {headers: this.getAuthHeaders()}).pipe(
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
    this.loggedInUser.set(undefined);
    //call backend
    // localStorage.removeItem(this.tokenKey);
    // localStorage.removeItem(this.userData);
  }

  getAuthHeaders(): HttpHeaders {
    return this.authHeaders ?? new HttpHeaders();
  }


}
