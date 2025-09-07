import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Card} from 'primeng/card';
import {Password} from 'primeng/password';
import {FormsModule} from '@angular/forms';
import {UserRegistrationRequest} from '../../models/userRegistrationRequest';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth-service';
import {finalize, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    Card,
    Password,
    FormsModule,
    InputText,
    Button,
    FloatLabel,
    PrimeTemplate
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  submitting = false;
  user =
    {username: '', password: '', firstName: '', lastName: '', email: ''} as UserRegistrationRequest;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private authService: AuthService) {
  }


  submit(form: any) {
    if (form.invalid) return;
    this.submitting = true;

    this.userService.registerNewUser(this.user).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Account created',
          detail: 'Welcome!',
        });
      }),
      switchMap(() => this.authService.login({username: this.user.username, password: this.user.password})),
      finalize(() => this.submitting = false)
    ).subscribe({
      next: () => {
        const userId = this.authService.loggedInUser()?.id;
        if (userId) {
          this.router.navigate(['/user-profile', userId]);
        }
        form.resetForm();
        this.user = {} as UserRegistrationRequest;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration failed',
          detail: err?.error?.message || 'Please try again later.',
        });
      }
    });
  }


}
