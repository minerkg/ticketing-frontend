import { TestBed } from '@angular/core/testing';

import { TicketElement } from './ticket-element';

describe('TicketElement', () => {
  let service: TicketElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketElement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
