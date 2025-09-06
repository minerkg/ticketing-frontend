import {Ticket} from './ticket';


export interface Customer {
  customerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  tickets?: Array<Ticket>;
}

