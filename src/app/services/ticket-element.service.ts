import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../models/api-response';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth-service';
import {TicketElement} from '../models/ticketElement';

@Injectable({
  providedIn: 'root'
})
export class TicketElementService {

  private readonly localVarPath = `ticket-element`;
  private readonly basePath = environment.apiBasePath;
  private readonly ticketElementUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public getAllActive(): Observable<TicketElement[]> {
    return this.httpClient
      .get<ApiResponse<TicketElement[]>>(this.ticketElementUrl, {headers: this.authService.getAuthHeaders()})
      .pipe(
        map((response) => response.data
          .filter(element => element.ticketElementStatus === TicketElement.TicketElementStatusEnum.Active) ?? []),
        catchError((error) => {
          console.error('Failed to load ticket elements', error);
          return throwError(() => error);
        })
      );
  }

}
