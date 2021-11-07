import { TestBed } from '@angular/core/testing';

import { AddressTransferService } from './address-transfer.service';

describe('AddressTransferService', () => {
  let service: AddressTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
