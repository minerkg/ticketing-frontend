import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {DatePipe, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {AuthService} from '../../services/auth/auth-service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

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

  @Input() protected userId: string | undefined;
  protected user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? undefined;
    if (!this.userId) return;
    this.userService.findUserById(this.userId).subscribe(response => {
      this.user = response;
    });
  }


  roles = Object.values(User.UserRoleEnum);

  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }

}
