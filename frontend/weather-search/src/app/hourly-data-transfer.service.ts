import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HourlyDataTransferService {

  private hourlyData = new BehaviorSubject<any>(null); // set default status
  currentHourlyData = this.hourlyData.asObservable();

  constructor() { }
  changeDailyData(dailyData: any) {
    this.hourlyData.next(dailyData)
  }
}
