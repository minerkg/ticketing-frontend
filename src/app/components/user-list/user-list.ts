import {Component, OnInit, signal} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-user-list',
  imports: [
    TableModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  ticketingUserList = signal<User[]>([]);

  constructor(protected userService: UserService) {
  }


  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
      this.ticketingUserList.set(response);
    });
  }

}
