import {TicketOperation} from '../app/components/ticket/ticket-list/ticket-operations';
import {User} from '../app/models/user';
import {Ticket} from '../app/models/ticket';
import UserRoleEnum = User.UserRoleEnum;
import TicketStatusEnum = Ticket.TicketStatusEnum;


export const environment = {
  production: true,
  apiBasePath: 'http://localhost:8080/api-v1'
  //apiBasePath: 'https://ticketing-backend-72of.onrender.com/api-v1'
};


export const TicketPermissionsMatrix: Record<UserRoleEnum, Partial<Record<TicketStatusEnum, TicketOperation[]>>> = {
  [UserRoleEnum.Admin]: {
    [TicketStatusEnum.New]:        [TicketOperation.View, TicketOperation.Assign, TicketOperation.Cancel],
    [TicketStatusEnum.Assigned]:   [TicketOperation.View, TicketOperation.Update, TicketOperation.Close, TicketOperation.Cancel],
    [TicketStatusEnum.InProgress]: [TicketOperation.View, TicketOperation.Update, TicketOperation.Close, TicketOperation.Cancel],
    [TicketStatusEnum.Closed]:     [TicketOperation.View],
    [TicketStatusEnum.Cancelled]:  [TicketOperation.View]
  },
  [UserRoleEnum.Supervisor]: {
    [TicketStatusEnum.New]:        [TicketOperation.View, TicketOperation.Assign],
    [TicketStatusEnum.Assigned]:   [TicketOperation.View, TicketOperation.Update],
    [TicketStatusEnum.InProgress]: [TicketOperation.View, TicketOperation.Update, TicketOperation.Close],

    [TicketStatusEnum.Closed]:     [TicketOperation.View],
    [TicketStatusEnum.Cancelled]:  [TicketOperation.View]
  },
  [UserRoleEnum.User]: {
    [TicketStatusEnum.New]:        [TicketOperation.View],
    [TicketStatusEnum.Assigned]:   [TicketOperation.View, TicketOperation.Close],
    [TicketStatusEnum.InProgress]: [TicketOperation.View, TicketOperation.Close],
    [TicketStatusEnum.Closed]:     [TicketOperation.View],
    [TicketStatusEnum.Cancelled]:  [TicketOperation.View]
  }
};


