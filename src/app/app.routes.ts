import {Routes} from '@angular/router';
import {Login} from './components/login/login.component';
import {Dashboard} from './components/dashboard/dashboard';
import {UserProfile} from './components/user-profile/user-profile';
import {Logout} from './components/logout/logout';
import {UserList} from './components/user-list/user-list';

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
    path: 'user-profile/:userId',
    component: UserProfile
  },
  {
    path: 'logout',
    component: Logout
  },
  {
    path: 'my-assigned-tickets',
    component: Dashboard
  },
  {
    path: 'user-list',
    component: UserList
  }
];
