import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {SolutionType} from '../models/ticket/solutionType';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SolutionTypeService {

  private readonly localVarPath = `solution-type`;
  private readonly basePath = environment.apiBasePath;
  private readonly solutionTypeUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient) {
  }

  public getAllActive(): Observable<SolutionType[]> {
    return this.httpClient
      .get<ApiResponse<SolutionType[]>>(this.solutionTypeUrl)
      .pipe(
        map((response) => response.data
          .filter(element => element.solutionTypeStatus === SolutionType.SolutionTypeStatusEnum.Active) ?? []),
        catchError((error) => {
          console.error('Failed to load solutions types', error);
          return throwError(() => error);
        })
      );
  }

  public getAll(): Observable<SolutionType[]> {
    return this.httpClient
      .get<ApiResponse<SolutionType[]>>(this.solutionTypeUrl)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to load solutions types', error);
          return throwError(() => error);
        })
      );
  }

  public create(solutionName: string): Observable<SolutionType> {
    return this.httpClient
      .post<ApiResponse<SolutionType>>(this.solutionTypeUrl, null, {
        params: {solutionName}
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.error('Failed to create solution type', error);
          return throwError(() => error);
        })
      );
  }


  public toggle(
    id: number,
    action: 'deactivate' | 'reactivate'
  ): Observable<SolutionType> {
    return this.httpClient
      .put<ApiResponse<SolutionType>>(`${this.solutionTypeUrl}/${action}`, null, {
        params: {id}
      })
      .pipe(
        map((resp) => resp.data),
        catchError((error) => {
          console.error(`Failed to ${action} solution type`, error);
          return throwError(() => error);
        })
      );
  }


}
