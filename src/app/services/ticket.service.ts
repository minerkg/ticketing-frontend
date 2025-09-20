import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Ticket} from '../models/ticket/ticket';
import {TicketCreationRequest} from '../models/ticket/ticketCreationRequest';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../models/api-response';
import {User} from '../models/user';
import {TicketCloseRequest} from '../models/ticket/ticketCloseRequest';
import {TicketUpdateRequest} from '../models/ticket/ticketUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly localVarPath = `complaint-ticket`;
  private readonly basePath = environment.apiBasePath;
  private readonly complaintTicketUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(protected httpClient: HttpClient) {
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
      .get<ApiResponse<Ticket[]>>(this.complaintTicketUrl)
      .pipe(
        map((response) => response.data ?? []),
        catchError((error) => {
          console.error('Failed to load tickets', error);
          return throwError(() => error);
        })
      );
  }

  public assignTicket(ticketId: number, assignToUser: User): Observable<Ticket> {
    const url = `${this.basePath}/${(this.localVarPath)}/assign/${ticketId}`;
    return this.httpClient
      .put<ApiResponse<Ticket>>(url, assignToUser)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to create ticket', error);
          return throwError(() => error);
        })
      );
  }


  public cancelTicket(ticketId: number): Observable<Ticket> {
    const url = `${this.basePath}/${(this.localVarPath)}/cancel/${ticketId}`;
    return this.httpClient
      .put<ApiResponse<Ticket>>(url, null)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to cancel the ticket', error);
          return throwError(() => error);
        })
      );
  }

  public closeTicket(ticketId: number, ticketCloseRequest: TicketCloseRequest): Observable<Ticket> {
    const url = `${this.basePath}/${(this.localVarPath)}/close/${ticketId}`;
    return this.httpClient
      .put<ApiResponse<Ticket>>(url, ticketCloseRequest)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to close ticket', error);
          return throwError(() => error);
        })
      );
  }

  public updateTicket(ticketId: number, ticketUpdateRequest: TicketUpdateRequest): Observable<Ticket> {
    const url = `${this.basePath}/${(this.localVarPath)}/update/${ticketId}`;
    return this.httpClient
      .put<ApiResponse<Ticket>>(url, ticketUpdateRequest)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to update ticket', error);
          return throwError(() => error);
        })
      );
  }


  public getCurrentUserAssignedTickets(): Observable<Ticket[]> {
    const complaintTicketUrl = `${this.complaintTicketUrl}/my-assigned-tickets`;
    return this.httpClient
      .get<ApiResponse<Ticket[]>>(complaintTicketUrl)
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

}
