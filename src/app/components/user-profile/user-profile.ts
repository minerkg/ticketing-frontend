import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {DatePipe, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
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
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (!userId) return;
      this.userId = userId;
      this.userService.findUserById(userId).subscribe(user => {
        this.user = user;
      });
    });
  }



  roles = Object.values(User.UserRoleEnum);

  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }

}
