import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Ticket} from '../models/ticket';
import {TicketCreationRequest} from '../models/ticketCreationRequest';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../models/api-response';
import {AuthService} from './auth/auth-service';
import {TicketComment} from '../models/ticketComment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly localVarPath = `complaint-ticket`;
  private readonly basePath = environment.apiBasePath;
  private readonly complaintTicketUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(protected httpClient: HttpClient, private readonly authService: AuthService) {
  }


  public createTicket(ticketCreationRequest: TicketCreationRequest): Observable<Ticket> {
    if (ticketCreationRequest === null || ticketCreationRequest === undefined) {
      throw new Error('Required parameter ticketCreationRequest was null or undefined when calling createTicket.');
    }
    const url = `${this.basePath}/${(this.localVarPath)}`;
    return this.httpClient
      .post<ApiResponse<Ticket>>(url, ticketCreationRequest)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to create ticket', error);
          return throwError(() => error);
        })
      );
  }

  public getAllTickets(): Observable<Ticket[]> {
    return this.httpClient
      .get<ApiResponse<Ticket[]>>(this.complaintTicketUrl, {headers: this.authService.getAuthHeaders()})
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load tickets', error);
          return throwError(() => error);
        })
      );
  }

  public getCurrentUserAssignedTickets(): Observable<Ticket[]> {
    const complaintTicketUrl = `${this.complaintTicketUrl}/my-assigned-tickets`;
    return this.httpClient
      .get<ApiResponse<Ticket[]>>(complaintTicketUrl, {headers: this.authService.getAuthHeaders()})
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load my-tickets', error);
          return throwError(() => error);
        })
      );
  }


  public getTicketById(ticketId: number) {
    return this.getAllTickets().pipe(
      map(tickets => tickets.find(ticket => ticket.ticketId === ticketId) ?? undefined)
    );
  }


  addComment(ticketId: number, newComment: TicketComment): Observable<Ticket | undefined> {
    //TODO: imlement
    return new Observable<Ticket | undefined>();
  }
}
