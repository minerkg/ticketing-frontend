import { Client } from './client';


export interface TicketCreationRequest {
    client?: Client;
    ticketType?: TicketCreationRequest.TicketTypeEnum;
    ticketElementName?: string;
    description?: string;
    ticketStatus?: TicketCreationRequest.TicketStatusEnum;
}
export namespace TicketCreationRequest {
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


