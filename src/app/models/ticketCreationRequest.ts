import {Ticket} from './ticket';


export interface TicketCreationRequest {
  customerId: string;
  ticketType: Ticket.TicketTypeEnum;
  ticketElementName: string;
  description?: string;
  ticketStatus: Ticket.TicketStatusEnum;
}



