import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from './auth-store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (authStore.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { r: state.url } });
  return false;
};
