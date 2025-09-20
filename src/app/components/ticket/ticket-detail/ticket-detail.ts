import {Component, Input, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../../../services/ticket.service';
import {Ticket} from '../../../models/ticket/ticket';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {TicketComment} from '../../../models/ticket/ticketComment';
import {InputText} from 'primeng/inputtext';
import {TicketActionsComponent} from '../ticket-actions/ticket-actions.component';
import {CommentService} from '../../../services/comment.service';
import {TicketingDateTimePipe} from '../../../shared/ticketing-date-time-pipe';
import {TicketUpdateRequest} from '../../../models/ticket/ticketUpdateRequest';
import {Textarea} from 'primeng/textarea';
import {TicketElement} from '../../../models/ticket/ticketElement';
import {TicketElementService} from '../../../services/ticket-element.service';
import {Select} from 'primeng/select';
import {AuthStore} from '../../../services/auth/auth-store';

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
    TicketingDateTimePipe,
    Textarea,
    Button,
    Select,
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {

  @Input() ticketId: number | undefined;
  @Input() hasActions = true;
  @Input() hasAddComment = true;

  ticketSignal = signal<Ticket | undefined>(undefined);
  ticketElementList: TicketElement[] = [];

  isEditing = false;


  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private authStore: AuthStore,
    private messageService: MessageService,
    private commentService: CommentService,
    private ticketElementService: TicketElementService,
  ) {
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId')) ?? undefined;
    if (!this.ticketId) return;

    this.route.queryParams.subscribe(params => {
      if (params['edit']) {
        this.isEditing = true;
      }
    });

    this.ticketService.getTicketById(this.ticketId).subscribe({
        next: (ticket) => this.ticketSignal.set(ticket),
        error: (err) => this.messageService.add({
          severity: 'error',
          summary: 'Fetching ticket failed',
          detail: 'Could not fetch ticket'
        })
      }
    );

    this.ticketElementService.getAllActive().subscribe({
        next: (ticketElementList) => this.ticketElementList = [...ticketElementList],
        error: (err) => this.messageService.add({
          severity: 'error',
          summary: 'Fetching ticket elements failed',
          detail: 'Could not fetch ticket elements'
        })
      }
    );
  }


  onEditModeChange(editing: boolean) {
    this.isEditing = editing;
  }

  saveTicketUpdate() {
    if (!this.ticketSignal()) return;
    const ticketUpdateRequest: TicketUpdateRequest = {
      ticketElementName: this.ticketSignal()!.ticketElement!.name,
      description: this.ticketSignal()!.description
    } as TicketUpdateRequest;

    this.ticketService.updateTicket(this.ticketSignal()!.ticketId, ticketUpdateRequest)
      .subscribe({
        next: (resp) => {
          this.isEditing = false;
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Ticket updated successfully',
              detail: 'Good job!'
            });

        },
        error: () => {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Failed to update the ticket',
              detail: 'Please try again later',
            }
          );
        },
      });
  }

  cancelEdit() {
    this.isEditing = false;
  }


  onTicketUpdate(event: Ticket) {
    this.ticketSignal.set(event);

  }


  newCommentText: string = '';

  addComment(ticket: Ticket) {
    if (!this.newCommentText.trim()) return;

    const newComment: TicketComment = {
      ticketId: ticket.ticketId,
      commenter: this.authStore.loggedInUser()!,
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
