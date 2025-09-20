import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';
import {Customer} from '../models/customer';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly localVarPath = `customer`;
  private readonly basePath = environment.apiBasePath;
  private readonly clientUrl = `${this.basePath}/${this.localVarPath}`;


  constructor(private readonly httpClient: HttpClient) {
  }


  public getAll(): Observable<Customer[]> {
    return this.httpClient
      .get<ApiResponse<Customer[]>>(this.clientUrl)
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load clients', error);
          return throwError(() => error);
        })
      );
  }

}
