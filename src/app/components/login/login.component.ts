import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import {AuthService} from '../../services/auth/auth-service';
import {AuthStore} from '../../services/auth/auth-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    FloatLabel,
    InputText,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  credentials = {
    username: '',
    password: '',
  };
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private authStore: AuthStore,
  ) {}

  ngOnInit(): void {
    if (this.authStore.isAuthenticated()) {
      const user = this.authStore.loggedInUser();
      if (user) {
        this.router.navigate(['/user-profile', user.id]);
      } else {
        this.router.navigate(['/user-profile']);
      }
    }
  }

  onSubmit(): void {
    this.loading.set(true);
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading.set(false);
        const user = this.authStore.loggedInUser();
        this.router.navigate(['/user-profile', user?.id]);
        this.messageService.add({
          severity: 'success',
          summary: 'Login successful',
          detail: `Welcome back!`,
        });
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed',
          detail: 'Invalid username or password.',
        });
      },
    });
  }
}
