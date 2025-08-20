import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {

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

  // ngOnInit(): void {
  //   if (this.authService.loggedIn()) {
  //     this.router.navigate(['/dashboard']);
  //   }
  //}
  //
  // onSubmit(): void {
  //   this.loading.set(true);
  //   this.authService.login(this.credentials).subscribe(isSuccess => {
  //     this.loading.set(false);
  //     if (isSuccess) {
  //       this.router.navigate(['/dashboard']);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'LoginComponent Successful',
  //         detail: 'Welcome back!'
  //       });
  //     } else {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'LoginComponent Failed',
  //         detail: 'Invalid username or password.'
  //       });
  //     }
  //   });
  // }


}
