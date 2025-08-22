import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {User} from '../../models/user';
import {Dialog} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SelectModule} from 'primeng/select';
import {Listbox} from 'primeng/listbox';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-select-user-modal',
  imports: [
    Dialog,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    Listbox,
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
    this.userService.getAllUsers().subscribe(
      (users) => this.userList.set(users.map((user: User) => ({
        label: user.username!,
        value: user
      }))));

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
