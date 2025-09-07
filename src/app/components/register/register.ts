import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Card} from 'primeng/card';
import {Password} from 'primeng/password';
import {FormsModule} from '@angular/forms';
import {UserRegistrationRequest} from '../../models/userRegistrationRequest';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'app-register',
  imports: [
    Card,
    Password,
    FormsModule,
    InputText,
    ButtonDirective,
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

  constructor(private userService: UserService, private messageService: MessageService) {
  }


  submit(form: any) {
    if (form.invalid) return;
    this.submitting = true;
    this.userService.registerNewUser(this.user).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Account created', detail: 'Welcome!'});
        form.resetForm();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Registration failed', detail: err?.error?.message});
      },
      complete: () => (this.submitting = false),
    });
  }


}
