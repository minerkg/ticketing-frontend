import {Component, OnInit, signal} from '@angular/core';
import {Ticket} from '../../models/ticket';
import {TicketService} from '../../services/ticket.service';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-ticket-list',
  imports: [
    TableModule,
    DatePipe,
    ButtonDirective
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit {

  ticketList = signal<Array<Ticket>>([]);

  constructor(private ticketService: TicketService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe({
      next: (data: Ticket[]) => {this.ticketList.set([...data]);},
      error: error => {this.messageService.add({
        severity: 'error',
        summary: 'Fetching ticket failed',
        detail: ` ${error} could not fetch ticket`
      })}

    });
  }

  viewTicket(ticket: Ticket) {
    this.router.navigate(['/ticket-detail', ticket.ticketId]);
  }


}
