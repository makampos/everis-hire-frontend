import { TestBed } from '@angular/core/testing';

import { CommnunityService } from './commnunity.service';

describe('CommnunityService', () => {
  let service: CommnunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommnunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
