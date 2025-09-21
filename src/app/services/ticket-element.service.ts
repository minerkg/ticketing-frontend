import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../models/api-response';
import {environment} from '../../environments/environment';
import {TicketElement} from '../models/ticket/ticketElement';

@Injectable({
  providedIn: 'root'
})
export class TicketElementService {

  private readonly localVarPath = `ticket-element`;
  private readonly basePath = environment.apiBasePath;
  private readonly ticketElementUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient) {
  }

  public getAllActive(): Observable<TicketElement[]> {
    return this.httpClient
      .get<ApiResponse<TicketElement[]>>(this.ticketElementUrl)
      .pipe(
        map((response) => response.data
          .filter(element => element.ticketElementStatus === TicketElement.TicketElementStatusEnum.Active) ?? []),
        catchError((error) => {
          console.error('Failed to load ticket elements', error);
          return throwError(() => error);
        })
      );
  }

  public getAll(): Observable<TicketElement[]> {
    return this.httpClient
      .get<ApiResponse<TicketElement[]>>(this.ticketElementUrl)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to load ticket elements', error);
          return throwError(() => error);
        })
      );
  }


  public create(elementName: string): Observable<TicketElement> {
    return this.httpClient
      .post<ApiResponse<TicketElement>>(this.ticketElementUrl, null, {
        params: { elementName }
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.error('Failed to create ticket element', error);
          return throwError(() => error);
        })
      );
  }

  public toggle(
    id: number,
    action: 'deactivate' | 'reactivate'
  ): Observable<TicketElement> {
    return this.httpClient
      .put<ApiResponse<TicketElement>>(`${this.ticketElementUrl}/${action}`, null, {
        params: { id }
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.error(`Failed to ${action} ticket element`, error);
          return throwError(() => error);
        })
      );
  }

}
