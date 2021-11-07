import { TestBed } from '@angular/core/testing';

import { LocationTransferService } from './location-transfer.service';

describe('LocationTransferService', () => {
  let service: LocationTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
