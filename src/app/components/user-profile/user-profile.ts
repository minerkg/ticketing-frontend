import {Component, Input, OnInit} from '@angular/core';
import {TicketingUserDto} from '../../models/ticketingUserDto';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {DatePipe, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {AuthService} from '../../services/auth/auth-service';

@Component({
  selector: 'app-user-profile',
  imports: [
    FormsModule,
    ButtonDirective,
    DatePipe,
    Card,
    NgIf
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  protected user: TicketingUserDto | null = null;

  constructor(protected authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.loggedInUser();
  }


  roles = Object.values(TicketingUserDto.UserRoleEnum);

  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }

}
