import { TestBed } from '@angular/core/testing';

import { DayIndexTransferService } from './day-index-transfer.service';

describe('DayIndexTransferService', () => {
  let service: DayIndexTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayIndexTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
