import {Component, OnInit, signal} from '@angular/core';
import {Ticket} from '../../models/ticket';
import {TicketService} from '../../services/ticket.service';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'app-ticket-list',
  imports: [
    TableModule,
    DatePipe,
    ButtonDirective,
    ProgressBar
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit {

  ticketList = signal<Array<Ticket>>([]);
  protected readonly Ticket = Ticket;

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

  getSlaProgress(createdWhen: string, slaHours?: number): number {
    if (!slaHours) return 0;

    const createdDate = new Date(createdWhen).getTime();
    const now = Date.now();
    const elapsedMs = now - createdDate;
    const totalMs = slaHours * 60 * 60 * 1000;

    let progress = (elapsedMs / totalMs) * 100;
    progress = Math.min(Math.max(progress, 0), 100);

    return progress;
  }


}
