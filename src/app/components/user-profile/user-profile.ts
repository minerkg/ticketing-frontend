import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {DatePipe} from '@angular/common';
import {Card} from 'primeng/card';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserDetailUpdate} from '../../models/user-detail-update';
import {MessageService} from 'primeng/api';
import {AuthStore} from '../../services/auth/auth-store';

@Component({
  selector: 'app-user-profile',
  imports: [
    FormsModule,
    ButtonDirective,
    DatePipe,
    Card,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  @Input() protected userId: string | undefined;
  protected user: User | undefined;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private authStore: AuthStore) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (!userId) return;
      this.userId = userId;
      if (this.authStore.loggedInUser()!.id === userId) {
        this.userService.findMyUsersDetail().subscribe(user => {
          this.user = user;
        });
      } else {
        this.userService.findUserById(this.userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  saveUpdatedDetails() {
    let userDetailUpdate = {
      userId: this.user?.id,
      username: this.user?.username,
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
    } as UserDetailUpdate;

    this.userService.updateUserDetail(userDetailUpdate).subscribe(
      {
        next: updatedUser => {
          this.user = updatedUser;
          this.messageService.add({
            severity: 'success',
            summary: 'Update Successful',
            detail: 'User details have been updated successfully.',
          });
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: err.error?.message || 'Something went wrong while updating user details.',
          });
        },
      }
    )
  }


  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  onSaveClicked() {
    this.toggleEdit();
    this.saveUpdatedDetails();
  }


}
