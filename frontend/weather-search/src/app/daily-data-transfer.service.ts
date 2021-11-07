import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DailyDataTransferService{

  private dailyData = new BehaviorSubject<any>(null); // set default status
  currentDailyData = this.dailyData.asObservable();

  constructor() { }
  changeDailyData(dailyData: any) {
    this.dailyData.next(dailyData)
  }
}
