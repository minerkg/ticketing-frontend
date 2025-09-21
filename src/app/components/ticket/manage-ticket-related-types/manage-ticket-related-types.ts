import { Component } from '@angular/core';
import {TicketElement} from '../../../models/ticket/ticketElement';
import {SolutionType} from '../../../models/ticket/solutionType';
import {MessageService} from 'primeng/api';
import {TicketElementService} from '../../../services/ticket-element.service';
import {SolutionTypeService} from '../../../services/solution-type.service';
import {ToggleButton} from 'primeng/togglebutton';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-manage-ticket-related-types',
  imports: [
    ToggleButton,
    FormsModule,
    TableModule,
    Button
  ],
  templateUrl: './manage-ticket-related-types.html',
  styleUrl: './manage-ticket-related-types.css'
})
export class ManageTicketRelatedTypes {


  solutionTypes: (SolutionType & { _statusBoolean: boolean })[] = [];
  ticketElements: (TicketElement & { _statusBoolean: boolean })[] = [];

  newSolutionName = '';
  newElementName = '';

  loadingSolutions = false;
  loadingElements = false;

  constructor(
    private solutionTypeService: SolutionTypeService,
    private ticketElementService: TicketElementService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSolutionTypes();
    this.loadTicketElements();
  }

  // --- Loaders ---
  loadSolutionTypes() {
    this.loadingSolutions = true;
    this.solutionTypeService.getAll().subscribe({
      next: (data) => {
        this.solutionTypes = data.map(s => ({
          ...s,
          _statusBoolean: s.solutionTypeStatus === SolutionType.SolutionTypeStatusEnum.Active
        }));
        this.loadingSolutions = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load solution types' });
        this.loadingSolutions = false;
      }
    });
  }

  loadTicketElements() {
    this.loadingElements = true;
    this.ticketElementService.getAll().subscribe({
      next: (data) => {
        this.ticketElements = data.map(e => ({
          ...e,
          _statusBoolean: e.ticketElementStatus === TicketElement.TicketElementStatusEnum.Active
        }));
        this.loadingElements = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load ticket elements' });
        this.loadingElements = false;
      }
    });
  }

  // --- Creators ---
  addSolutionType() {
    if (!this.newSolutionName.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Solution name cannot be empty' });
      return;
    }

    this.solutionTypeService.create(this.newSolutionName).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Solution type added' });
        this.newSolutionName = '';
        this.loadSolutionTypes();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create solution type' })
    });
  }

  addTicketElement() {
    if (!this.newElementName.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Element name cannot be empty' });
      return;
    }

    this.ticketElementService.create(this.newElementName).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Ticket element added' });
        this.newElementName = '';
        this.loadTicketElements();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create ticket element' })
    });
  }

  // --- Toggles ---
  toggleSolutionType(solution: SolutionType & { _statusBoolean: boolean }) {
    const action = solution._statusBoolean ? 'reactivate' : 'deactivate';
    this.solutionTypeService.toggle(solution.id!, action).subscribe({
      next: (updated) => {
        solution.solutionTypeStatus = updated.solutionTypeStatus;
        solution._statusBoolean = updated.solutionTypeStatus === SolutionType.SolutionTypeStatusEnum.Active;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: `Solution type ${action}d` });
      },
      error: () => {
        solution._statusBoolean = !solution._statusBoolean; // revert UI
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to ${action} solution type` });
      }
    });
  }

  toggleTicketElement(element: TicketElement & { _statusBoolean: boolean }) {
    const action = element._statusBoolean ? 'reactivate' : 'deactivate';
    this.ticketElementService.toggle(element.id!, action).subscribe({
      next: (updated) => {
        element.ticketElementStatus = updated.ticketElementStatus;
        element._statusBoolean = updated.ticketElementStatus === TicketElement.TicketElementStatusEnum.Active;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: `Ticket element ${action}d` });
      },
      error: () => {
        element._statusBoolean = !element._statusBoolean; // revert UI
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to ${action} ticket element` });
      }
    });
  }

}
