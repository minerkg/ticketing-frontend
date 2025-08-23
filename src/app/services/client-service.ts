import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';
import {Client} from '../models/client';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly localVarPath = `client`;
  private readonly basePath = environment.apiBasePath;
  private readonly clientUrl = `${this.basePath}/${this.localVarPath}`;

  clientList = new Array({firstName: "alma", lastName: "alma", phoneNumber: "", email: ""} as Client);

  //TODO: remove hardcoded values


  constructor(private readonly httpClient: HttpClient, private readonly authService: AuthService) {
  }


  public getAll(): Observable<Client[]> {
    return of(this.clientList);

    // return this.httpClient
    //   .get<ApiResponse<Client[]>>(this.clientUrl, {headers: this.authService.getAuthHeaders()})
    //   .pipe(
    //     map((response) => response.data ?? []),
    //     catchError((error) => {
    //       console.error('Failed to load clients', error);
    //       return throwError(() => error);
    //     })
    //   );
  }

}
