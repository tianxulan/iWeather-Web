import { TestBed } from '@angular/core/testing';

import { DailyDataTransferService } from './daily-data-transfer.service';

describe('DailyDataTransferService', () => {
  let service: DailyDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
