import {Inject, Injectable, Optional} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpContext} from '@angular/common/http';
import {ApiResponseTicketDto, BASE_PATH, Configuration, TicketCreationRequest} from '../api';
import {Observable} from 'rxjs';
import {TicketDto} from '../models/ticketDto';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService{

  private localVarPath = `/complaint-ticket`;
  constructor(protected httpClient: HttpClient) {
    super();
  }


  public createTicket(ticketCreationRequest: TicketCreationRequest): Observable<TicketDto> {
    if (ticketCreationRequest === null || ticketCreationRequest === undefined) {
      throw new Error('Required parameter ticketCreationRequest was null or undefined when calling createTicket.');
    }
    let localVarHeaders = this.defaultHeaders;


    const { basePath, withCredentials } = this.configuration;
    return this.httpClient.request<ApiResponseTicketDto>('post', `${basePath}${(this.localVarPath)}`,
      {
        context: localVarHttpContext,
        body: ticketCreationRequest,
        responseType: <any>responseType_,
        ...(withCredentials ? { withCredentials } : {}),
        headers: localVarHeaders,
        observe: observe,
        transferCache: localVarTransferCache,
        reportProgress: reportProgress
      }
    );
  }

}
