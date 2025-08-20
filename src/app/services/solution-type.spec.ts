import { TestBed } from '@angular/core/testing';

import { SolutionType } from './solution-type';

describe('SolutionType', () => {
  let service: SolutionType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
