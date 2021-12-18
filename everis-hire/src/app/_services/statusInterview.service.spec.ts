/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatusInterviewService } from './statusInterview.service';

describe('Service: StatusInterview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusInterviewService]
    });
  });

  it('should ...', inject([StatusInterviewService], (service: StatusInterviewService) => {
    expect(service).toBeTruthy();
  }));
});
