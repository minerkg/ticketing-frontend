import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {User} from '../../models/user';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SelectModule} from 'primeng/select';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-select-user-modal',
  imports: [
    Dialog,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    Button,

  ],
  templateUrl: './select-user-modal.html',
  styleUrl: './select-user-modal.css'
})
export class SelectUserModal {
  displaySignal = signal(false);
  selectedUser?: User;
  userList = signal<{ label: string; value: User }[]>([]);

  @Output() userSelected = new EventEmitter<User>();


  @Input()
  set open(value: boolean) {
    this.displaySignal.set(value);

    if (value) {
      this.loadUsers();
    }
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

  private loadUsers() {
    this.userService.getAllUsers().subscribe(users =>
      this.userList.set(
        users.map(user => ({
          label: user.username!,
          value: user,
        }))
      )
    );
  }
}
