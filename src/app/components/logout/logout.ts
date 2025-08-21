import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {MessageService} from 'primeng/api';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {Router, RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-logout',
  imports: [
    Card,
    Divider,
    RouterLink,
    ButtonDirective,
    Message
  ],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit {

  protected countdown = signal(10);

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }


  ngOnInit(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'You logged out successfully',
      detail: 'Goodbye!'
    });

    const interval = setInterval(() => {
      this.countdown.update(sec => sec - 1)
      if (this.countdown() === 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);


  }


}
