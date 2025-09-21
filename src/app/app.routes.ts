import {Routes} from '@angular/router';
import {Dashboard} from './components/dashboard/dashboard';
import {UserProfile} from './components/user-profile/user-profile';
import {UserList} from './components/user-list/user-list';
import {TicketDetail} from './components/ticket/ticket-detail/ticket-detail';
import {TicketList} from './components/ticket/ticket-list/ticket-list';
import {TicketFilters} from './components/ticket/ticket-list/filters';
import {CreateTicket} from './components/ticket/create-ticket/create-ticket';
import {CustomerList} from './components/customer-list/customer-list';
import {CloseTicket} from './components/ticket/close-ticket/close-ticket';
import {Register} from './components/register/register';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout';
import { authGuard } from './services/auth/auth-guard';
import {Home} from './components/home/home';
import {ChangePassword} from './components/change-password/change-password';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'change-password',  component: ChangePassword },

  // Protected routes
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'user-profile/:userId', component: UserProfile, canActivate: [authGuard] },


  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },

  { path: 'my-assigned-tickets', component: TicketList, canActivate: [authGuard], data: { filter: TicketFilters.MY_ASSIGNED } },
  { path: 'user-list', component: UserList, canActivate: [authGuard] },
  { path: 'ticket-list', component: TicketList, canActivate: [authGuard] },
  { path: 'ticket-detail/:ticketId', component: TicketDetail, canActivate: [authGuard] },
  { path: 'create-ticket', component: CreateTicket, canActivate: [authGuard] },
  { path: 'all-customers', component: CustomerList, canActivate: [authGuard] },
  { path: 'close-ticket/:ticketId', component: CloseTicket, canActivate: [authGuard] },

  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },

];
