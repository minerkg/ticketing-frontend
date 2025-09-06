import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseTicket } from './close-ticket';

describe('CloseTicket', () => {
  let component: CloseTicket;
  let fixture: ComponentFixture<CloseTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
