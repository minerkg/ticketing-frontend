import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Message } from 'primeng/message';
import { Divider } from 'primeng/divider';
import { Button } from 'primeng/button';
import {AuthService} from '../../services/auth/auth-service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [Card, Message, Divider, Button, RouterLink],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css'],
})
export class LogoutComponent implements OnInit {
  countdown = signal(5);

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.logout().subscribe({
      next: () => this.startCountdown(),
      error: () => this.startCountdown(),
    });
  }

  private startCountdown() {
    const interval = setInterval(() => {
      const value = this.countdown() - 1;
      this.countdown.set(value);
      if (value <= 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
