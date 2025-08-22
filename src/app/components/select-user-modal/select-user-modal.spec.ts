import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserModal } from './select-user-modal';

describe('SelectUserModal', () => {
  let component: SelectUserModal;
  let fixture: ComponentFixture<SelectUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUserModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUserModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
