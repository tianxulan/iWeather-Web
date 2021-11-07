import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ResultAddress } from './resultAddress';

@Injectable({
  providedIn: 'root'
})
export class AddressTransferService {

  private address = new BehaviorSubject<string>(""); // set default status
  currentAddress = this.address.asObservable();

  constructor() { }

  changeAddress(address: string) {
    this.address.next(address)
  }
}
