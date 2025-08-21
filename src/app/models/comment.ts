import { User } from './user';


export interface Comment {
    commentText?: string;
    commenter?: User;
    ticketId: number;
    commentedWhen?: string;
}

