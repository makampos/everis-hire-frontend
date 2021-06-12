import { TestBed } from '@angular/core/testing';

import { StatusJobService } from './status-job.service';

describe('StatusJobService', () => {
  let service: StatusJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
