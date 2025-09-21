export interface TicketElement {
    id?: number;
    name?: string;
    ticketElementStatus?: TicketElement.TicketElementStatusEnum;
}
export namespace TicketElement {
    export const TicketElementStatusEnum = {
        Active: 'ACTIVE',
        Inactive: 'INACTIVE'
    } as const;
    export type TicketElementStatusEnum = typeof TicketElementStatusEnum[keyof typeof TicketElementStatusEnum];
}


