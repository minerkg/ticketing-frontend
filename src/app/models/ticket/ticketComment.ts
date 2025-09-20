import { User } from '../user';


export interface TicketComment {
    commentText?: string;
    commenter?: User;
    ticketId: number;
    commentedWhen?: string;
}

