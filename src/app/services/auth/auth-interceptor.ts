import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth-service';
import {Router} from '@angular/router';
import {catchError, EMPTY, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const headers = authService.getAuthHeaders();
  const cloned = headers ? req.clone({headers}) : req;
  return next(cloned);
};

export const authRedirectInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const headers = authService.getAuthHeaders();
  const clonedReq = headers ? req.clone({headers}) : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
        return EMPTY;
      }
      return throwError(() => error);
    })
  );
};
