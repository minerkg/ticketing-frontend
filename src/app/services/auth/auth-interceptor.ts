import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { isExpired } from './token.utils';
import { lastValueFrom, Subject, firstValueFrom } from 'rxjs';
import { filter, take, catchError } from 'rxjs/operators';
import {AuthService} from './auth-service';
import {AuthStore} from './auth-store';

let refreshInFlight$: Subject<boolean> | null = null;



function addAuthHeader(req: HttpRequest<any>, token: string) {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` }, withCredentials: true });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.accessToken();
  const authedReq = token && !isExpired(token) ? addAuthHeader(req, token) : req;

  return next(authedReq).pipe(
    catchError(async (err) => {
      if (!(err instanceof HttpErrorResponse) || err.status !== 401) throw err;

      const url = req.url ?? '';
      if (url.includes('/user/login') || url.includes('/user/refresh') || url.includes('/user/logout')) {
        authStore.clear();
        throw err;
      }

      if (!authStore.accessToken()) {
        authStore.clear();
        throw err;
      }

      if (!refreshInFlight$) {
        refreshInFlight$ = new Subject<boolean>();
        authStore.setRefreshing(true);
        try {
          await lastValueFrom(inject(AuthService).refresh());
          refreshInFlight$!.next(true);
        } catch {
          refreshInFlight$!.next(false);
          authStore.clear();
          throw err;
        } finally {
          refreshInFlight$!.complete();
          refreshInFlight$ = null;
          authStore.setRefreshing(false);
        }
      } else {
        const ok = await firstValueFrom(refreshInFlight$.pipe(filter(Boolean), take(1))).catch(() => false);
        if (!ok) {
          authStore.clear();
          throw err;
        }
      }

      const newToken = authStore.accessToken();
      const retried = newToken ? addAuthHeader(req, newToken) : req;
      return await lastValueFrom(next(retried));
    })
  );
};
