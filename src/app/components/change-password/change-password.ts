import { Component } from '@angular/core';
import { PasswordChangeRequest } from '../../models/passwordChangeRequest';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'app-change-password',
  imports: [
    Button,
    InputText,
    FormsModule,
    FloatLabel
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  userName = '';
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private userService: UserService, private messageService: MessageService) {}

  private validateForm(): boolean {
    if (!this.userName.trim()) {
      this.showValidationError('Username is required');
      return false;
    }

    if (!this.oldPassword.trim()) {
      this.showValidationError('Current password is required');
      return false;
    }

    if (!this.newPassword.trim()) {
      this.showValidationError('New password is required');
      return false;
    }

    if (this.newPassword.length < 8) {
      this.showValidationError('Password must be at least 8 characters long');
      return false;
    }

    if (!/[A-Z]/.test(this.newPassword)) {
      this.showValidationError('Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(this.newPassword)) {
      this.showValidationError('Password must contain at least one lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(this.newPassword)) {
      this.showValidationError('Password must contain at least one number');
      return false;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(this.newPassword)) {
      this.showValidationError('Password must contain at least one special character');
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showValidationError('New password and confirmation do not match');
      return false;
    }

    return true;
  }

  private showValidationError(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail
    });
  }

  onSubmit() {
    if (!this.validateForm()) return;

    const request: PasswordChangeRequest = {
      username: this.userName.trim(),
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.userService.changePassword(request).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Password Changed',
          detail: 'Your password has been updated successfully'
        });

        this.userName = '';
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Password Change Failed',
          detail: err?.error?.message || 'Unexpected error'
        });
      }
    });
  }
}
