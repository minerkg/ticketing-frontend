import {Component, Input, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {User} from '../../models/user';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-ticket-detail',
  imports: [
    Card,
    Divider
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {

  @Input() ticketId?: number | undefined;

  ticketSignal = signal<Ticket | undefined>(undefined);

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId')) ?? undefined;
    if (!this.ticketId) return;
    this.ticketService.getTicketById(1).subscribe(
      ticket => {
        this.ticketSignal.set(ticket);
      }
    );

  }

  /*
  *
  * {
      next: (ticket) => this.ticketSignal.set(ticket),
      error: (err) => this.messageService.add({
        severity: 'error',
        summary: 'Fetching ticket failed',
        detail: 'Could not fetch ticket'
      })
    }*/

  isEditable(): boolean {
    const t = this.ticketSignal();
    const currentUser = this.authService.loggedInUser();
    return !!t
      && (currentUser?.id === t.assignedTo?.id
        || this.authService.loggedInUser()?.userRole === User.UserRoleEnum.Admin);
  }


}
