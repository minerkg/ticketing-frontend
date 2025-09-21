import {Component, OnInit, signal} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {RoleUpdateRequest} from '../../models/role-update-request';
import {MessageService} from 'primeng/api';
import UserRoleEnum = User.UserRoleEnum;
import {AuthStore} from '../../services/auth/auth-store';
import {ToggleSwitch} from 'primeng/toggleswitch';

@Component({
  selector: 'app-user-list',
  imports: [
    TableModule,
    Button,
    Select,
    FormsModule,
    ToggleSwitch
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  ticketingUserList = signal<User[]>([]);
  loggedInUserRole?: UserRoleEnum;
  roleList?: string[];

  constructor(protected userService: UserService,
              private router: Router,
              private authService: AuthStore,
              private messageService: MessageService) {
  }


  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
      this.ticketingUserList.set(response);
    });
    this.loggedInUserRole = this.authService.loggedInUserRole();
    this.roleList = Object.values(UserRoleEnum);

  }


  viewUser(userId: string) {
    this.router.navigate(['/user-profile', userId]);
  }

  updateUserRole(user: User) {
    const userRoleUpdateRequest = {
      username: user.username,
      newRole: user.userRole
    } as RoleUpdateRequest;
    this.userService.updateUserRole(userRoleUpdateRequest).subscribe(
      {
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Role update successful',
            detail: 'The user role have been updated successfully.',
          });
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Role update failed',
            detail: err.error?.message || 'Something went wrong while updating users role.',
          });
        },
      }
    )

  }

  toggleUserAccount(user: User) {
    this.userService.toggleAccount(user.id, user.accountEnabled!).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.username} has been ${user.accountEnabled ? 'enabled' : 'disabled'}.`
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to update ${user.username}'s account status.`
        });
        user.accountEnabled = !user.accountEnabled;
      }
    });
  }




  protected readonly UserRoleEnum = UserRoleEnum;
}
