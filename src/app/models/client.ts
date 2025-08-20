import {TicketDto} from './ticketDto';


export interface Client {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  tickets?: Array<TicketDto>;
}

