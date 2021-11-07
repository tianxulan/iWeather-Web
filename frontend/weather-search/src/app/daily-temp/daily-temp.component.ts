import { Component, OnInit } from '@angular/core';
import { DailyDataTransferService } from '../daily-data-transfer.service';

@Component({
  selector: 'app-daily-temp',
  templateUrl: './daily-temp.component.html',
  styleUrls: ['./daily-temp.component.css']
})
export class DailyTempComponent implements OnInit {

  daily:any = null;
  constructor(private _dailyDataTransferService: DailyDataTransferService) { }

  ngOnInit(): void {
    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
      this.daily = daily;
    });
  }
  parseDailyData()
  {

  }

}
