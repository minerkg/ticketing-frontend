import {Component, Input, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {TicketService} from '../../../services/ticket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketCloseRequest} from '../../../models/ticket/ticketCloseRequest';
import {SolutionTypeService} from '../../../services/solution-type.service';
import {TicketDetail} from '../ticket-detail/ticket-detail';

@Component({
  selector: 'app-close-ticket',
  imports: [
    Button,
    Dialog,
    PrimeTemplate,
    ReactiveFormsModule,
    Select,
    Textarea,
    FormsModule,
    TicketDetail
  ],
  templateUrl: './close-ticket.html',
  styleUrl: './close-ticket.css'
})
export class CloseTicket implements OnInit {

  display = signal(false);
  ticketCloseRequest: TicketCloseRequest = {solutionTypeName: "", solutionDescription: ""};
  solutionTypNameList?: string[];

  @Input() ticketId!: number;

  constructor(private ticketService: TicketService,
              private solutionTypeService: SolutionTypeService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.open = true;

    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId')) ?? undefined;

    this.solutionTypeService.getAllActive().subscribe(
      {
        next: (ticketSolutionList) => {
          this.solutionTypNameList = [...ticketSolutionList.map(solutionType => solutionType.name!)];
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fetching ticket solution types failed',
            detail: ` ${error} could not fetch ticket solution types`
          })
        }
      }
    );
  }

  set open(bool: boolean) {
    this.display.set(bool);
    this.ticketCloseRequest = {solutionTypeName: "", solutionDescription: ""};
  }

  get open() {
    return this.display();
  }

  closeTicket() {
    //ticket close request form completed beforehand
    this.ticketService.closeTicket(this.ticketId, this.ticketCloseRequest).subscribe(
      {
        next: () => {
          this.display.set(false);
          this.router.navigate(['/ticket-list']).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Ticket closed successfully.',
              detail: 'Have a nice day!'
            });
          });

        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to close the ticket',
            detail: 'Please try again.'
          })
        }
      }
    )
  }

  cancel() {
    this.display.set(false);
    this.router.navigate(['/ticket-list']);
  }


}
