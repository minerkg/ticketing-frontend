import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {iconMap, labelMap, TicketOperation} from '../ticket-list/ticket-operations';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {Button} from 'primeng/button';
import {AuthService} from "../../services/auth/auth-service";
import {SelectUserModal} from "../select-user-modal/select-user-modal";
import {MessageService} from "primeng/api";
import {User} from '../../models/user';

@Component({
  selector: 'app-ticket-actions',
  imports: [
    Button,
    SelectUserModal
  ],
  templateUrl: './ticket-actions.component.html',
  styleUrl: './ticket-actions.component.css'
})
export class TicketActionsComponent implements OnInit {

  ticketOperationList: TicketOperation[] = new Array<TicketOperation>();
  @Input() selectedTicket!: Ticket;
  @Output() selectedTicketChange = new EventEmitter<Ticket>();

  isTicketDetailPage = false;
  selectUserModalIsOpen = signal(false);


  constructor(private ticketService: TicketService,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegments => {
      this.isTicketDetailPage = urlSegments.some(segment => segment.path === 'ticket-detail');
    });
    if (!this.isTicketDetailPage) {
      this.ticketOperationList = [...this.ticketOperationList, TicketOperation.View];
    }
    if (this.authService.loggedInUserIsAdmin() && !this.selectedTicket.assignedTo) {
      this.ticketOperationList = [...this.ticketOperationList, TicketOperation.Assign]
    }
    if (this.authService.loggedInUserIsAdmin()) {
      this.ticketOperationList = [...this.ticketOperationList,
        TicketOperation.Cancel, TicketOperation.Update, TicketOperation.Close];
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

      // other actions...
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


  getIcon(action: TicketOperation) {
    return iconMap[action];
  }

  getLabel(action: TicketOperation) {
    return labelMap[action];
  }

}
