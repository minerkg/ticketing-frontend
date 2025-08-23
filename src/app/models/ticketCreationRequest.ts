import {Client} from './client';
import {Ticket} from './ticket';


export interface TicketCreationRequest {
  client?: Client;
  ticketType?: Ticket.TicketTypeEnum;
  ticketElementName?: string;
  description?: string;
  ticketStatus?: Ticket.TicketStatusEnum;
}



