import {Ticket} from '../../../models/ticket';

export interface TicketFilter {
  name: string;
  predicate: (ticket: Ticket) => boolean;
}


export const TicketFilters = {
  ALL: {
    name: 'All Tickets',
    predicate: (ticket: Ticket) => true
  },
  NEW: {
    name: 'New Tickets',
    predicate: (ticket: Ticket) => ticket.ticketStatus === Ticket.TicketStatusEnum.New
  },
  MY_ASSIGNED: (currentUserId: string) => ({
    name: 'My Assigned Tickets',
    predicate: (ticket: Ticket) => ticket.assignedTo?.id === currentUserId
  }),
  CLOSED: {
    name: 'Closed Tickets',
    predicate: (ticket: Ticket) => ticket.ticketStatus === Ticket.TicketStatusEnum.Closed
  }
};
