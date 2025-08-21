import {Ticket} from './ticket';


export interface Client {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  tickets?: Array<Ticket>;
}

