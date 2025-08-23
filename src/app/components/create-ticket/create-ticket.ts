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
    //this.clientList = this.clientService.getAll().suscribe(); //TODO: ...
    this.clientList = new Array({firstName: "alma", lastName: "alma", phoneNumber: "", email: ""} as Client);

    //this.ticketElementNameList = this.ticketElementService.getAllActive().suscribe(); //TODO: ...
    this.ticketElementNameList = new Array('Billing complaint');
  }


  set open(bool: boolean) {
    this.display.set(bool);
    this.ticketCreationRequest = {};
  }

  get open() {
    return this.display();
  }

  createTicket() {
    this.ticketCreationRequest!.ticketStatus = Ticket.TicketStatusEnum.New;
    this.ticketService.createTicket(this.ticketCreationRequest!).subscribe(
      {
        next: () => {
          this.router.navigate(['/all-tickets']);
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

    this.display.set(false);
  }

  cancel() {
    this.display.set(false);
    this.router.navigate(['/']);

  }

}
