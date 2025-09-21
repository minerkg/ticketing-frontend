import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketRelatedTypes } from './manage-ticket-related-types';

describe('ManageTicketRelatedTypes', () => {
  let component: ManageTicketRelatedTypes;
  let fixture: ComponentFixture<ManageTicketRelatedTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTicketRelatedTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTicketRelatedTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
