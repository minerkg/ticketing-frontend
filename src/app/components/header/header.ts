import {Component, OnInit, Signal, signal} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {Menu} from 'primeng/menu';
import {ButtonDirective} from 'primeng/button';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {AuthService} from '../../services/auth/auth-service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    Menu,
    ButtonDirective,
    PrimeTemplate,
    NgIf
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {


  constructor(protected readonly authService: AuthService, private router: Router) {
  }


  // Horizontal menubar items (optional)
  items: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-home', routerLink: '/'},
    {label: 'About', icon: 'pi pi-info', routerLink: '/about'},
  ];

  // Vertical menu items
  verticalItems: MenuItem[] = [
    {label: 'Dashboard', icon: 'pi pi-chart-line', routerLink: '/dashboard'},
    {label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings'},
  ];

  login() {
    this.router.navigate(['/login']);
    this.authService.loggedIn.update( currentValue => !currentValue)
  }

  logout() {
    this.router.navigate(['/logout']);
    this.authService.loggedIn.update( currentValue => !currentValue)
  }

}
