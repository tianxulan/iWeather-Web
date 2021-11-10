import { Component, OnInit } from '@angular/core';
import { HourlyDataTransferService } from '../hourly-data-transfer.service';
import * as Highcharts from 'highcharts';
import { DailyDataTransferService } from '../daily-data-transfer.service';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
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
