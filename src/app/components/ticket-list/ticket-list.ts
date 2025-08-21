import {Component, OnInit, signal} from '@angular/core';
import {Ticket} from '../../models/ticket';
import {TicketService} from '../../services/ticket.service';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [
    TableModule,
    DatePipe
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit {

  ticketList = signal<Array<Ticket>>([]);

  constructor(private ticketService: TicketService, private router: Router) {
  }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe(response => {
      this.ticketList.set(response);
    });
  }

  viewTicket(ticket: Ticket) {
    this.router.navigate(['/ticket-detail', ticket.id]);
  }


}
