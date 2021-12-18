/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatusCandidateService } from './StatusCandidate.service';

describe('Service: StatusCandidate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusCandidateService]
    });
  });

  it('should ...', inject([StatusCandidateService], (service: StatusCandidateService) => {
    expect(service).toBeTruthy();
  }));
});
