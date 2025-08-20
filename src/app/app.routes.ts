import {Routes} from '@angular/router';
import {Login} from './components/login/login.component';
import {Dashboard} from './components/dashboard/dashboard';
import {UserProfile} from './components/user-profile/user-profile';
import {Logout} from './components/logout/logout';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'user-profile',
    component: UserProfile
  },
  {
    path: 'logout',
    component: Logout
  },
  {
    path: 'my-assigned-tickets',
    component: Dashboard
  }
];
