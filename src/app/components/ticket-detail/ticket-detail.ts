import {Component, Input, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {MessageService} from 'primeng/api';
import {User} from '../../models/user';
import {DatePipe} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {TicketComment} from '../../models/ticketComment';
import {InputText} from 'primeng/inputtext';
import {TicketActionsComponent} from '../ticket-actions/ticket-actions.component';
import {CommentService} from '../../services/comment.service';
import {TicketingDateTimePipe} from '../../shared/ticketing-date-time-pipe';

@Component({
  selector: 'app-ticket-detail',
  imports: [
    Card,
    Divider,
    DatePipe,
    ButtonDirective,
    FormsModule,
    InputText,
    TicketActionsComponent,
    TicketingDateTimePipe
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {

  @Input() ticketId: number | undefined;

  ticketSignal = signal<Ticket | undefined>(undefined);


  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private commentService: CommentService,
  ) {
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId')) ?? undefined;
    if (!this.ticketId) return;
    this.ticketService.getTicketById(this.ticketId).subscribe({
        next: (ticket) => this.ticketSignal.set(ticket),
        error: (err) => this.messageService.add({
          severity: 'error',
          summary: 'Fetching ticket failed',
          detail: 'Could not fetch ticket'
        })
      }
    );
  }


  isEditable(): boolean {
    const t = this.ticketSignal();
    const currentUser = this.authService.loggedInUser();
    return !!t
      && (currentUser?.id === t.assignedTo?.id
        || this.authService.loggedInUser()?.userRole === User.UserRoleEnum.Admin);
  }

  onTicketUpdate(event: Ticket) {
    this.ticketSignal.set(event);

  }


  newCommentText: string = '';

  addComment(ticket: Ticket) {
    if (!this.newCommentText.trim()) return;

    const newComment: TicketComment = {
      ticketId: ticket.ticketId,
      commenter: this.authService.loggedInUser(),
      commentedWhen: new Date().toISOString(),
      commentText: this.newCommentText
    };

    this.ticketSignal.update(t =>
      t ? {...t, comments: [...(t.comments ?? []), newComment]} : t
    );

    this.commentService.addComment(ticket.ticketId, newComment).subscribe({
      next: () => this.newCommentText = '',
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Failed to add comment',
        detail: 'Please try again.'
      })
    });
    this.newCommentText = '';
  }


  protected readonly Ticket = Ticket;
}
