import {Injectable} from '@angular/core';
import {TicketComment} from '../models/ticketComment';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Ticket} from '../models/ticket';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth-service';
import {ApiResponse} from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly localVarPath = `comment`;
  private readonly basePath = environment.apiBasePath;
  private readonly commentUrl = `${this.basePath}/${this.localVarPath}`;

  constructor(protected httpClient: HttpClient, private readonly authService: AuthService) {
  }


  addComment(ticketId: number, newComment: TicketComment): Observable<Ticket> {
    const url = `${this.basePath}/${this.localVarPath}/${ticketId}`;
    return this.httpClient
      .post<ApiResponse<Ticket>>(url, newComment.commentText)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Failed to create new comment', error);
          return throwError(() => error);
        })
      );
  }


}
