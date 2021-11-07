import { Component, OnInit } from '@angular/core';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { weatherCodeFilename, weatherCodesDescript } from '../weatherCodesDescript';
@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})

export class DayViewComponent implements OnInit {
  daily:any = null;
  intervals:any = null;
  dates:string[] = [];
  constructor(private _dailyDataTransferService: DailyDataTransferService) { }

  ngOnInit(): void {
    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
        this.intervals = daily.data.timelines[0].intervals;
    });
  }

  weatherCodeToDescript(code: string)
  {
    return weatherCodesDescript[code];
  }
  
  weatherCodeToImagePath(code:string)
  {
    return weatherCodeFilename[code];
  }

  


}
