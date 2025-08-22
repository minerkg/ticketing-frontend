import {Component, OnInit, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {TicketCreationRequest} from '../../models/ticketCreationRequest';
import {Client} from '../../models/client';
import {Textarea} from 'primeng/textarea';
import {FormsModule} from '@angular/forms';
import {PrimeTemplate} from 'primeng/api';
import {Select} from 'primeng/select';
import {TicketService} from '../../services/ticket.service';
import {Router} from '@angular/router';
import {TicketElementService} from '../../services/ticket-element.service';
import {ClientService} from '../../services/client-service';

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

  ticket: TicketCreationRequest = {};


  clients: Client[] = [
    {userId: "sad1d", firstName: 'Client A'},
    {userId: "32tf", firstName: 'Client B'}
  ];
  ticketTypes = Object.values(TicketCreationRequest.TicketTypeEnum);
  ticketElements = ['Element 1', 'Element 2', 'Element 3']; //TODO: from the service

  constructor(private ticketService: TicketService,
              private ticketElementService: TicketElementService,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit() {
    this.open = true;
  }


  set open(bool: boolean) {
    this.display.set(bool);
    this.ticket = {};
  }

  get open() {
    return this.display();
  }

  confirm() {
    //TODO: call the service
    this.display.set(false);
  }

  cancel() {
    this.display.set(false);
    this.router.navigate(['/']);

  }

}
