import { TestBed } from '@angular/core/testing';

import { HourlyDataTransferService } from './hourly-data-transfer.service';

describe('HourlyDataTransferService', () => {
  let service: HourlyDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
