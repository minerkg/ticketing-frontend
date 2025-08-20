import {Injectable} from '@angular/core';
import {BaseService} from './base-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TicketDto} from '../models/ticketDto';
import {TicketCreationRequest} from '../models/ticketCreationRequest';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService {

  private localVarPath = `complaint-ticket`;

  constructor(protected httpClient: HttpClient) {
    super();
  }


  public createTicket(ticketCreationRequest: TicketCreationRequest): Observable<TicketDto> {
    if (ticketCreationRequest === null || ticketCreationRequest === undefined) {
      throw new Error('Required parameter ticketCreationRequest was null or undefined when calling createTicket.');
    }
    return this.httpClient.request<TicketDto>('post', `${this.basePath}/${(this.localVarPath)}`);
  }

}
