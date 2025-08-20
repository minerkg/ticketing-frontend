import {Injectable, signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BaseService} from '../base-service';
import {ApiResponse} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  readonly loggedIn = signal(false);
  private authHeaders: HttpHeaders | null = null;
  private tokenKey = 'authToken';


  constructor(private http: HttpClient, private router: Router) {
    super();
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
    return this.http.get<ApiResponse<any>>(loginUrl, {headers: this.getAuthHeaders()}).pipe(
      map(() => true),
      tap(() => {
        this.loggedIn.set(true);
        localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
      }),
      catchError(error => {
        // Failed login
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
