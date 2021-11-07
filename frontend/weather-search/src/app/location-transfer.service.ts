import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationTransferService {

  private locationData = new BehaviorSubject<any>(null); // set default status
  currentLocationData = this.locationData.asObservable();

  constructor() { }
  changeLocation(locationData: any) {
    this.locationData.next(locationData)
  }
}