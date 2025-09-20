import {User} from '../user';
import {TicketElement} from './ticketElement';
import {SolutionType} from './solutionType';
import {TicketComment} from './ticketComment';
import {Customer} from '../customer';


export interface Ticket {

  ticketId: number;
  customer: Customer;
  ticketType: Ticket.TicketTypeEnum;
  ticketElement?: TicketElement;
  createdWhen: string;
  createdBy?: User;
  description?: string;
  ticketStatus?: Ticket.TicketStatusEnum;
  slaHours?: number;
  assignedTo?: User;
  assignedWhen?: string;
  solutionType?: SolutionType;
  solutionDescription?: string;
  closedBy?: User;
  closedWhen?: string;
  cancelledBy?: User;
  cancelledWhen?: string;
  comments?: Array<TicketComment>;
}

export namespace Ticket {
  export const TicketTypeEnum = {
    Complaint: 'COMPLAINT',
    Request: 'REQUEST',
    Incident: 'INCIDENT'
  } as const;
  export type TicketTypeEnum = typeof TicketTypeEnum[keyof typeof TicketTypeEnum];
  export const TicketStatusEnum = {
    New: 'NEW',
    Assigned: 'ASSIGNED',
    InProgress: 'IN_PROGRESS',
    Resolved: 'RESOLVED',
    Closed: 'CLOSED',
    Cancelled: 'CANCELLED'
  } as const;
  export type TicketStatusEnum = typeof TicketStatusEnum[keyof typeof TicketStatusEnum];
}


