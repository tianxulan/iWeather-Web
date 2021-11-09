import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultAvailableTransferServiceService {

  private resultAvailable = new BehaviorSubject<boolean>(false); // set default status
  currentResultAvailable= this.resultAvailable.asObservable();

  constructor() { }

  changeDayIndex(index: boolean) {
    this.resultAvailable.next(index)
  }
}

