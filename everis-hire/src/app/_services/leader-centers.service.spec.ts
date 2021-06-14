import { TestBed } from '@angular/core/testing';

import { LeaderCentersService } from './leader-centers.service';

describe('LeaderCentersService', () => {
  let service: LeaderCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderCentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
