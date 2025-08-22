import {Component, Input, OnInit, signal, ViewChild} from '@angular/core';
import {iconMap, labelMap, TicketOperation} from '../ticket-list/ticket-operations';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {Button} from 'primeng/button';
import {AuthService} from "../../services/auth/auth-service";
import {User} from "../../models/user";
import {SelectUserModal} from "../select-user-modal/select-user-modal";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-ticket-actions',
    imports: [
        Button,
        SelectUserModal
    ],
    templateUrl: './ticket-actions.component.html',
    styleUrl: './ticket-actions.component.css'
})
export class TicketActionsComponent implements OnInit {

    ticketOperationList: TicketOperation[] = new Array<TicketOperation>();
    @Input() selectedTicket!: Ticket;
    isTicketDetailPage = false;
    selectedUser?: User;
    selectUserModalIsOpen = signal(false);


    constructor(private ticketService: TicketService,
                private router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.url.subscribe(urlSegments => {
            this.isTicketDetailPage = urlSegments.some(segment => segment.path === 'ticket-detail');
        });
        if (!this.isTicketDetailPage) {
            this.ticketOperationList = [...this.ticketOperationList, TicketOperation.View];
        }
        if (this.authService.loggedInUserIsAdmin() && !this.selectedTicket.assignedTo) {
            this.ticketOperationList = [...this.ticketOperationList, TicketOperation.Assign]
        }
        if (this.authService.loggedInUserIsAdmin()) {
            this.ticketOperationList = [...this.ticketOperationList,
                TicketOperation.Cancel, TicketOperation.Update, TicketOperation.Close];
        }

    }

    onUserSelected(user: User) {
        this.selectedUser = user;
    }


    onAction(action: TicketOperation) {
        switch (action) {
            case TicketOperation.Assign:
                this.selectUserModalIsOpen.set(true);
                break;

            case TicketOperation.View:
                this.viewTicket(this.selectedTicket);
                break;

            // other actions...
        }
    }

    onAssignedUserSelected(event: any) {
        const selectedUser = event;
        this.ticketService.assignTicket(this.selectedTicket.ticketId, selectedUser).subscribe({
            next: () => this.messageService.add(
                {
                    severity: 'success',
                    summary: 'Ticket assigned successfully',
                    detail: 'Good job'
                }
            )
        });

    }


    private viewTicket(ticket: Ticket) {
        this.router.navigate(['/ticket-detail', ticket.ticketId]);
    }


    getIcon(action: TicketOperation) {
        return iconMap[action];
    }

    getLabel(action: TicketOperation) {
        return labelMap[action];
    }

}
