import { Component, OnInit } from '@angular/core';
import { HourlyDataTransferService } from '../hourly-data-transfer.service';

@Component({
  selector: 'app-meteogram',
  templateUrl: './meteogram.component.html',
  styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
  hourly: any=null;
  
  constructor(private _hourlyDataTransferService: HourlyDataTransferService) { }

  ngOnInit(): void {
    this._hourlyDataTransferService.currentHourlyData.subscribe(hourly=> {
      this.hourly = hourly;
  });
  }

}
