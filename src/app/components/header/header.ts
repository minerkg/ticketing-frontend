import {Component, computed} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {Button} from 'primeng/button';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {AuthService} from '../../services/auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    PrimeTemplate,
    Button
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {


  constructor(protected readonly authService: AuthService, private router: Router) {
  }


  readonly items = computed<MenuItem[]>(() => {
    const baseItems: MenuItem[] = [
      {label: 'Home', icon: 'pi pi-home', routerLink: '/'},

    ];

    if (this.authService.loggedInUser()) {
      baseItems.push({
        label: 'Create Ticket',
        icon: 'pi pi-file', routerLink: ['/create-ticket']
      });
      baseItems.push({
        label: 'My profile',
        icon: 'pi pi-users', routerLink: ['/user-profile',
          this.authService.loggedInUser()?.id]
      });
      baseItems.push({
        label: 'My assigned tickets',
        icon: 'pi pi-info',
        routerLink: '/my-assigned-tickets'
      });
      baseItems.push({
        label: 'All customers',
        icon: 'pi pi-info',
        routerLink: '/all-customers',
      })
    }

    if (this.authService.loggedInUserIsAdmin()) {
      baseItems.push({label: 'All users', icon: 'pi pi-users', routerLink: '/user-list'});
      baseItems.push({label: 'All tickets', icon: 'pi pi-chart-line', routerLink: '/ticket-list'},)
    }
    return baseItems;
  });


  login() {
    this.router.navigate(['/login']);

  }

  logout() {
    this.router.navigate(['/logout']);

  }

}
