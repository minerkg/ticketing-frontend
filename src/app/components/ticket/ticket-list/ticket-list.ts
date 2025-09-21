import {Component, OnInit, signal} from '@angular/core';
import {Ticket} from '../../../models/ticket/ticket';
import {TicketService} from '../../../services/ticket.service';
import {TableModule} from 'primeng/table';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProgressBar} from 'primeng/progressbar';
import {TicketActionsComponent} from '../ticket-actions/ticket-actions.component';
import {TicketingDateTimePipe} from '../../../shared/ticketing-date-time-pipe';
import {AuthStore} from '../../../services/auth/auth-store';
import {Page} from '../../../models/ticket/page';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {TicketStatusFilter, TicketFilters} from './filters';
import TicketStatusEnum = Ticket.TicketStatusEnum;


@Component({
  selector: 'app-ticket-list',
  imports: [
    TableModule,
    ProgressBar,
    TicketActionsComponent,
    TicketingDateTimePipe,
    FormsModule,
    Button,
    Toolbar,
    IconField,
    InputIcon,
    InputText,
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketList implements OnInit {
  tickets = signal<Ticket[]>([]);
  totalRecords = signal<number>(0);

  page = 0;
  pageSize = 10;
  keyword = '';
  sortBy = 'createdWhen';
  direction: 'asc' | 'desc' = 'desc';

  status?: string;
  assignedTo?: string;

  loading = signal<boolean>(false);
  private routeFilter?: TicketStatusFilter;

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private authStore: AuthStore
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const filter = data['filter'];
      if (typeof filter === 'function') {
        const userId = this.authStore.loggedInUser()?.id;
        this.routeFilter = userId ? filter(userId) : TicketFilters.ALL;
      } else {
        this.routeFilter = filter ?? TicketFilters.ALL;
      }
      this.applyRouteFilter();
      this.loadTickets();
    });
  }

  private applyRouteFilter(): void {
    this.status = '';
    this.assignedTo = '';

    if (this.routeFilter?.name === TicketFilters.NEW.name) {
      this.status = TicketStatusEnum.New;
    } else if (this.routeFilter?.name === TicketFilters.CLOSED.name) {
      this.status = TicketStatusEnum.Closed;
    } else if (this.routeFilter?.name === TicketFilters.MY_ASSIGNED('').name) {
      const userId = this.authStore.loggedInUser()?.id;
      if (userId) this.assignedTo = userId;
    }
  }

  private loadTickets() {
    this.loading.set(true);
    console.log(this.page)
    this.ticketService.getAllTicketsFilteredAndPaged(
      this.page,
      this.pageSize,
      this.keyword,
      this.sortBy,
      this.direction,
      this.status,
      this.assignedTo
    ).subscribe({
      next: (data: Page<Ticket>) => {
        this.tickets.set(data.content);
        this.totalRecords.set(data.page.totalElements);
        this.page = data.page.number;
        this.pageSize = data.page.size;
        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fetching tickets failed',
          detail: `${error.err} could not fetch tickets`
        });
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.first / event.rows;
    this.pageSize = event.rows;
    this.loadTickets();
  }

  onSearch() {
    this.page = 0;
    this.loadTickets();
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

  onTicketUpdate(event: any) {
    this.tickets.set(
      this.tickets().map(ticket =>
        event.ticketId === ticket.ticketId ? event : ticket
      )
    );
  }


}
