import {Component, OnInit, signal} from '@angular/core';
import {Ticket} from '../../../models/ticket';
import {TicketService} from '../../../services/ticket.service';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProgressBar} from 'primeng/progressbar';
import {TicketFilter, TicketFilters} from './filters';
import {AuthService} from '../../../services/auth/auth-service';
import {TicketActionsComponent} from '../ticket-actions/ticket-actions.component';
import {TicketingDateTimePipe} from '../../../shared/ticketing-date-time-pipe';


@Component({
  selector: 'app-ticket-list',
  imports: [
    TableModule,
    ProgressBar,
    TicketActionsComponent,
    TicketingDateTimePipe
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit {

  allTickets = signal<Ticket[]>([]);
  filteredTicketList = signal<Ticket[]>([]);


  protected readonly Ticket = Ticket;
  private filter?: TicketFilter;

  constructor(private ticketService: TicketService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.ticketService.getAllTickets().subscribe({
      next: (data: Ticket[]) => {
        this.allTickets.set([...data]);
        if (!this.filter) {
          this.filter = TicketFilters.ALL;
        }
        this.route.data.subscribe(data => {
          const routeFilter = data['filter'];
          if (typeof routeFilter === 'function') {
            const userId = this.authService.loggedInUser()?.id;
            this.filter = userId ? routeFilter(userId) : TicketFilters.ALL;
          } else {
            this.filter = routeFilter ?? TicketFilters.ALL;
          }
          this.applyFilter();
        });

      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fetching ticket failed',
          detail: ` ${error} could not fetch ticket`
        })
      }

    });
  }

  onTicketUpdate(event: any) {
    this.filteredTicketList
      .set(this.filteredTicketList()
        .map(ticket => event.ticketId === ticket.ticketId ? event : ticket));

  }

  private applyFilter(): void {
    const predicate = this.filter?.predicate ?? (() => true);
    this.filteredTicketList.set(this.allTickets().filter(predicate));
  }


  getSlaProgress(createdWhen: string, slaHours?: number): number {
    if (!slaHours) return 0;

    const createdDate = new Date(createdWhen).getTime();
    const now = Date.now();
    const elapsedMs = now - createdDate;
    const totalMs = slaHours * 60 * 60 * 1000;

    let progress = (elapsedMs / totalMs) * 100;
    progress = Math.min(Math.max(progress, 0), 100);

    return Math.round(progress * 100) / 100;
  }


}
