import { TestBed } from '@angular/core/testing';

import { LtfService } from './ltf.service';

describe('LtfService', () => {
  let service: LtfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LtfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
