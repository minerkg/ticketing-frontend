import {computed, Injectable, signal} from '@angular/core';
import {User} from '../../models/user';
import {isExpired} from './token.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private _accessToken = signal<string | null>(null);
  private _user = signal<User | null>(null);
  private _isRefreshing = signal(false);

  readonly accessToken = this._accessToken.asReadonly();
  readonly loggedInUser = this._user.asReadonly();
  readonly loggedInUserRole = computed(() => this._user()?.userRole);

  readonly isAuthenticated = computed(() => {
    const t = this._accessToken();
    return !!t && !isExpired(t);
  });
  readonly isRefreshing = this._isRefreshing.asReadonly();

  setAccessToken(t: string | null) {
    this._accessToken.set(t);
  }

  setUser(u: User | null) {
    this._user.set(u);
  }

  setRefreshing(v: boolean) {
    this._isRefreshing.set(v);
  }

  clear() {
    this._accessToken.set(null);
    this._user.set(null);
  }

}
