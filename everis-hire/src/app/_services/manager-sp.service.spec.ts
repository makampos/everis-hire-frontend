import { TestBed } from '@angular/core/testing';

import { ManagerSpService } from './manager-sp.service';

describe('ManagerSpService', () => {
  let service: ManagerSpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerSpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
