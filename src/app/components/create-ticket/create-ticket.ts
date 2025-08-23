import {Component, OnInit, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {TicketCreationRequest} from '../../models/ticketCreationRequest';
import {Client} from '../../models/client';
import {Textarea} from 'primeng/textarea';
import {FormsModule} from '@angular/forms';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Select} from 'primeng/select';
import {TicketService} from '../../services/ticket.service';
import {Router} from '@angular/router';
import {TicketElementService} from '../../services/ticket-element.service';
import {ClientService} from '../../services/client-service';
import {Ticket} from '../../models/ticket';

@Component({
  selector: 'app-create-ticket',
  imports: [
    Dialog,
    Button,
    Textarea,
    FormsModule,
    PrimeTemplate,
    Select,
  ],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css'
})
export class CreateTicket implements OnInit {


  display = signal(false);
  ticketCreationRequest: TicketCreationRequest = {};
  clientList?: Client[];
  ticketTypeList = Object.values(Ticket.TicketTypeEnum);
  ticketElementNameList?: string[];

  constructor(private ticketService: TicketService,
              private ticketElementService: TicketElementService,
              private clientService: ClientService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.open = true;
    this.clientService.getAll().subscribe(
      {
        next: (clientList) => {
          this.clientList = [...clientList];
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fetching clients failed',
            detail: ` ${error} could not fetch clients`
          })
        }
      }
    );


    this.ticketElementService.getAllActive().subscribe(
      {
        next: (ticketElements) => {
          this.ticketElementNameList = [...ticketElements.map(element => element.name!)];
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fetching ticket elements failed',
            detail: ` ${error} could not fetch ticket elements`
          })
        }
      }
    );

  }

  set open(bool: boolean) {
    this.display.set(bool);
    this.ticketCreationRequest = {};
  }

  get open() {
    return this.display();
  }

  createTicket() {
    this.ticketCreationRequest.ticketStatus = Ticket.TicketStatusEnum.New;
    this.ticketService.createTicket(this.ticketCreationRequest).subscribe(
      {
        next: () => {
          this.display.set(false);
          this.router.navigate(['/ticket-list']).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Ticket created',
              detail: 'Have a nice day!'
            });
          });

        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to create new ticket',
            detail: 'Please try again.'
          })
        }
      }
    )
  }

  cancel() {
    this.display.set(false);
    this.router.navigate(['/']);

  }

}
