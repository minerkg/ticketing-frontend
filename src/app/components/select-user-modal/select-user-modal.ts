import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {User} from '../../models/user';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SelectModule} from 'primeng/select';

@Component({
  selector: 'app-select-user-modal',
  imports: [
    Dialog,
    Button,
    FormsModule,
    SelectModule

  ],
  templateUrl: './select-user-modal.html',
  styleUrl: './select-user-modal.css'
})
export class SelectUserModal {
  displaySignal = signal(false);
  selectedUser?: User;
  userList = signal<User[]>([]);

  @Output() userSelected = new EventEmitter<User>();

  @Input()
  set open(value: boolean) {
    this.displaySignal.set(value);
    this.userService.getAllUsers().subscribe(
      (users) => this.userList.set(users)
    )
    this.selectedUser = undefined;
  }

  get open(): boolean {
    return this.displaySignal();
  }

  constructor(private userService: UserService) {
  }


  confirm() {
    if (this.selectedUser) {
      this.userSelected.emit(this.selectedUser);
      this.displaySignal.set(false);
    }
  }


  cancel() {
    this.displaySignal.set(false);
  }
}
