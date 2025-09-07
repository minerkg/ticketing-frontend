import { TestBed } from '@angular/core/testing';

import { SolutionTypeService } from './solution-type.service';

describe('SolutionType', () => {
  let service: SolutionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
