import {Component, EventEmitter, Input, OnChanges, OnInit, Output, signal} from '@angular/core';
import {iconMap, labelMap, TicketOperation} from '../ticket-list/ticket-operations';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../../services/ticket.service';
import {Ticket} from '../../../models/ticket';
import {Button} from 'primeng/button';
import {AuthService} from "../../../services/auth/auth-service";
import {SelectUserModal} from "../../select-user-modal/select-user-modal";
import {MessageService} from "primeng/api";
import {User} from '../../../models/user';
import {TicketPermissionsMatrix} from '../../../../environments/environment';
import UserRoleEnum = User.UserRoleEnum;

@Component({
  selector: 'app-ticket-actions',
  imports: [
    Button,
    SelectUserModal
  ],
  templateUrl: './ticket-actions.component.html',
  styleUrl: './ticket-actions.component.css'
})
export class TicketActionsComponent implements OnInit , OnChanges {

  ticketOperationList = signal<TicketOperation[]>([]);
  @Input() selectedTicket!: Ticket;
  @Output() selectedTicketChange = new EventEmitter<Ticket>();
  @Input() editing = false;
  isEditing = signal<boolean>(false);

  @Output() ticketUpdateModeChange = new EventEmitter<boolean>();


  isTicketDetailPage = false;
  selectUserModalIsOpen = signal(false);


  constructor(private ticketService: TicketService,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService
  ) {
  }

  ngOnChanges() {
    this.isEditing.set(this.editing);
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegments => {
      this.isTicketDetailPage = urlSegments.some(segment => segment.path === 'ticket-detail');
    });

    const userRole = this.authService.loggedInUserRole();
    const status = this.selectedTicket.ticketStatus;

    const allowedOps = TicketPermissionsMatrix[userRole!]?.[status!] ?? [];

    this.ticketOperationList.update(current => {
      const merged = new Set([...current, ...allowedOps]);
      return Array.from(merged);
    });

    if (this.isTicketDetailPage) {
      this.ticketOperationList.update(current =>
        current.filter(op => op !== TicketOperation.View)
      );
    }

    if (userRole === UserRoleEnum.User) {
      const loggedInUser = this.authService.loggedInUser();
      if (
        this.selectedTicket.assignedTo &&
        this.selectedTicket.assignedTo.id !== loggedInUser!.id
      ) {
        this.ticketOperationList.update(current =>
          current.filter(op => op !== TicketOperation.Close)
        );
      }
    }

  }

  onAction(action: TicketOperation) {
    switch (action) {
      case TicketOperation.Assign:
        this.selectUserModalIsOpen.set(true);
        break;
      case TicketOperation.View:
        this.viewTicket(this.selectedTicket);
        break;
      case TicketOperation.Cancel:
        this.cancelTicket();
        break;
      case TicketOperation.Close:
        this.closeTicket(this.selectedTicket);
        break;
      case TicketOperation.Update:
        this.updateTicket(this.selectedTicket);
        break;
    }
  }

  private cancelTicket() {
    this.ticketService.cancelTicket(this.selectedTicket.ticketId).subscribe({
      next: (resp) => {
        this.selectedTicket = resp;
        this.selectedTicketChange.emit(this.selectedTicket);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Ticket closed successfully',
            detail: 'Good job!'
          });

      },
      error: () => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Failed to cancel the ticket',
            detail: 'Please try again later',
          }
        );
      },
    })
  }

  onAssignedUserSelected(event: any) {
    const selectedUser: User = event;
    this.ticketService.assignTicket(this.selectedTicket.ticketId, selectedUser).subscribe({
      next: (resp) => {
        this.selectedTicket = resp;
        this.selectedTicketChange.emit(this.selectedTicket);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Ticket assigned successfully',
            detail: 'Good job'
          }
        );
      }
    });
  }

  private viewTicket(ticket: Ticket) {
    this.router.navigate(['/ticket-detail', ticket.ticketId]);
  }

  private closeTicket(selectedTicket: Ticket) {
    this.router.navigate(['/close-ticket', selectedTicket.ticketId]);
  }

  private updateTicket(ticket: Ticket) {
    if (!this.isTicketDetailPage) {
      this.router.navigate(
        ['/ticket-detail', this.selectedTicket.ticketId],
        {queryParams: {edit: true}}
      );

    } else {
      this.isEditing.update(current => !current);
      this.ticketUpdateModeChange.emit(this.isEditing());
    }
  }


  getIcon(action: TicketOperation) {
    return iconMap[action];
  }

  getLabel(action: TicketOperation) {
    if (action === TicketOperation.Update && this.isEditing()) {
      return 'Editing ..';
    }
    return labelMap[action];
  }

}
