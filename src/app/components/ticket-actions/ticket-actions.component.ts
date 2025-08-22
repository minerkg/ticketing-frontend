import {Component, Input, signal} from '@angular/core';
import {iconMap, labelMap, TicketOperation} from '../ticket-list/ticket-operations';
import {Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-ticket-actions',
  imports: [
    Button
  ],
  templateUrl: './ticket-actions.component.html',
  styleUrl: './ticket-actions.component.css'
})
export class TicketActionsComponent {

  ticketOperationList = signal<TicketOperation[]>([TicketOperation.View]);
  @Input() selectedTicket!: Ticket;


  constructor(private ticketService: TicketService, private router: Router) {}


  onAction(action: TicketOperation) {
    switch (action) {
      // case TicketOperation.Update: this.ticketService.updateTicket(); break;
      // case TicketOperation.Close: this.ticketService.closeTicket(); break;
      // case TicketOperation.Cancel: this.ticketService.cancelTicket(); break;
      // case TicketOperation.Assign: this.ticketService.assignTicket(ticket.ticketId, ); break;
      case TicketOperation.View:
        this.viewTicket(this.selectedTicket);
        break;

    }
  }

  private viewTicket(ticket: Ticket) {
    this.router.navigate(['/ticket-detail', ticket.ticketId]);
  }


  getIcon(action: TicketOperation) {
    return iconMap[action];
  }

  getLabel(action: TicketOperation) {
    return labelMap[action];
  }

}
