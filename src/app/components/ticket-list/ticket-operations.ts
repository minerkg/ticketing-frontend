export enum TicketOperation {

  Update = 'update',
  Close = 'close',
  Cancel = 'cancel',
  Assign = 'assign',
  View = 'view',


}

export const iconMap: Record<TicketOperation, string> = {
  [TicketOperation.Update]: 'pi pi-pencil',
  [TicketOperation.Close]: 'pi pi-lock',
  [TicketOperation.Cancel]: 'pi pi-times',
  [TicketOperation.Assign]: 'pi pi-user-plus',
  [TicketOperation.View]: 'pi pi-search',

};

export const labelMap: Record<TicketOperation, string> = {
  [TicketOperation.Update]: 'Update',
  [TicketOperation.Close]: 'Close',
  [TicketOperation.Cancel]: 'Cancel',
  [TicketOperation.Assign]: 'Assign',
  [TicketOperation.View]: 'View',
};
