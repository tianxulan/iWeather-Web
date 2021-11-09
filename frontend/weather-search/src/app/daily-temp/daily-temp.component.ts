import { Component, OnInit } from '@angular/core';
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
  selector: 'app-daily-temp',
  templateUrl: './daily-temp.component.html',
  styleUrls: ['./daily-temp.component.css']
})
export class DailyTempComponent implements OnInit {

  daily:any = null;
  temperatureRangeData= [];
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'arearange',
      height: '500'
  },
  title: {
      text: 'Temperature Ranges(Min, Max)'
  },
  xAxis: {
      type: "datetime",
      accessibility:
      {
          rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.'
      }
  },
  yAxis: {
      title: {
          text: null
      }
  },
  tooltip: {
      shared: true,
      valueSuffix: ' °F',
      xDateFormat: '%A, %b %e'
  },
  plotOptions: {
      series: {
         
      }
  },
  legend: {
      enabled: false
  },
  series: []
  } ; // required
  constructor(private _dailyDataTransferService: DailyDataTransferService) { }

  ngOnInit(): void {
    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
      this.daily = daily.data.timelines[0].intervals;
      daily.data.timelines[0].intervals.forEach(element => {
        this.temperatureRangeData.push([new Date(element.startTime).valueOf(), element.values.temperatureMin, element.values.temperatureMax])
      });
      console.log(this.temperatureRangeData);
      this.chartOptions.series = this.temperatureRangeData;
    });
    
  }
  parseDailyData()
  {

  }

}
