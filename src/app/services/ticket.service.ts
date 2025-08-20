import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TicketDto} from '../models/ticketDto';
import {TicketCreationRequest} from '../models/ticketCreationRequest';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private localVarPath = `complaint-ticket`;
  private readonly basePath = environment.apiBasePath;

  constructor(protected httpClient: HttpClient) {
  }


  public createTicket(ticketCreationRequest: TicketCreationRequest): Observable<TicketDto> {
    if (ticketCreationRequest === null || ticketCreationRequest === undefined) {
      throw new Error('Required parameter ticketCreationRequest was null or undefined when calling createTicket.');
    }
    return this.httpClient.request<TicketDto>('post', `${this.basePath}/${(this.localVarPath)}`);
  }

}
