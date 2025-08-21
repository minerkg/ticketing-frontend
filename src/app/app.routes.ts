import {Routes} from '@angular/router';
import {Login} from './components/login/login.component';
import {Dashboard} from './components/dashboard/dashboard';
import {UserProfile} from './components/user-profile/user-profile';
import {Logout} from './components/logout/logout';
import {UserList} from './components/user-list/user-list';
import {TicketDetail} from './components/ticket-detail/ticket-detail';
import {TicketList} from './components/ticket-list/ticket-list';
import {TicketFilters} from './components/ticket-list/filters';

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
    component: TicketList,
    data: {filter: TicketFilters.MY_ASSIGNED}
  },
  {
    path: 'user-list',
    component: UserList
  },
  {
    path: 'ticket-list',
    component: TicketList
  },
  {
    path: 'ticket-detail/:ticketId',
    component: TicketDetail
  }

];
