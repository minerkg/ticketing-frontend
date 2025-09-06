import {Customer} from './customer';
import {Ticket} from './ticket';


export interface TicketCreationRequest {
  client?: Customer;
  ticketType?: Ticket.TicketTypeEnum;
  ticketElementName?: string;
  description?: string;
  ticketStatus?: Ticket.TicketStatusEnum;
}



