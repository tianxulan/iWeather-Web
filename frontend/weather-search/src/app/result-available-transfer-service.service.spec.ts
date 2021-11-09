import { TestBed } from '@angular/core/testing';

import { ResultAvailableTransferServiceService } from './result-available-transfer-service.service';

describe('ResultAvailableTransferServiceService', () => {
  let service: ResultAvailableTransferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultAvailableTransferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
