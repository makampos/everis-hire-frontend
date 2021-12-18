/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllocationTypeService } from './allocationType.service';

describe('Service: AllocationType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocationTypeService]
    });
  });

  it('should ...', inject([AllocationTypeService], (service: AllocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
