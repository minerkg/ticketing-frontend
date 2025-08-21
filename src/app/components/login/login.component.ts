import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    Toast,
    FormsModule,
    FloatLabel,
    InputText
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {

  credentials = {
    username: '',
    password: ''
  };
  loading = signal(false);


  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/user-profile']);
    }
  }

  onSubmit(): void {
    this.loading.set(true);
    this.authService.login(this.credentials).subscribe(isSuccess => {
      this.loading.set(false);
      if (isSuccess) {
        this.router.navigate(['/user-profile', this.authService.loggedInUser()?.id]);
        this.messageService.add({
          severity: 'success',
          summary: 'You logged in successfully',
          detail: 'Welcome back!'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Your login attempt failed',
          detail: 'Invalid username or password.'
        });
      }
    });
  }


}
