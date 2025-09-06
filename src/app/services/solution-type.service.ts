import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {SolutionType} from '../models/solutionType';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth-service';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SolutionTypeService {

  private readonly localVarPath = `solution-type`;
  private readonly basePath = environment.apiBasePath;
  private readonly solutionTypeUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public getAllActive(): Observable<SolutionType[]> {
    return this.httpClient
      .get<ApiResponse<SolutionType[]>>(this.solutionTypeUrl, {headers: this.authService.getAuthHeaders()})
      .pipe(
        map((response) => response.data
          .filter(element => element.solutionTypeStatus === SolutionType.SolutionTypeStatusEnum.Active) ?? []),
        catchError((error) => {
          console.error('Failed to load solutions types', error);
          return throwError(() => error);
        })
      );
  }

}
