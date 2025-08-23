import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly localVarPath = `complaint-ticket`;
  private readonly basePath = environment.apiBasePath;
  private readonly complaintTicketUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private readonly httpClient: HttpClient) { }


  getAll() {

  }
}
