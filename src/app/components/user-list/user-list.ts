import {Component, OnInit, signal} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    TableModule,
    Button
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  ticketingUserList = signal<User[]>([]);

  constructor(protected userService: UserService, private router: Router,) {
  }


  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
      this.ticketingUserList.set(response);
    });
  }


  viewUser(userId: string) {
    this.router.navigate(['/user-profile', userId]);
  }


}
