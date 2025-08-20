import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected basePath = 'http://localhost:8080/api/v1';
  public defaultHeaders = new HttpHeaders();


}
