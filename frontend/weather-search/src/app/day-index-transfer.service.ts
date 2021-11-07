import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayIndexTransferService {

  private dayIndex = new BehaviorSubject<number>(0); // set default status
  currentDayIndex = this.dayIndex.asObservable();

  constructor() { }

  changeDayIndex(index: number) {
    this.dayIndex.next(index)
  }
}
