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
  Highcharts: typeof Highcharts = Highcharts; // required
  

  
constructor(private _hourlyDataTransferService: HourlyDataTransferService) { }

ngOnInit(): void 
{
    this._hourlyDataTransferService.currentHourlyData.subscribe(hourly=> {
      this.hourly = hourly;
    });
    this.loadScript('https://code.highcharts.com/highcharts.js');
    this.loadScript("https://code.highcharts.com/highcharts.js");
    this.loadScript("https://code.highcharts.com/modules/windbarb.js");
    this.loadScript("https://code.highcharts.com/modules/pattern-fill.js");
    this.loadScript("https://code.highcharts.com/modules/data.js");
    this.loadScript("https://code.highcharts.com/modules/exporting.js");
    this.loadScript("https://code.highcharts.com/modules/accessibility.js");
    this.loadScript('../../assets/meteogram.js');
}
public loadScript(url: string) {
  const body = <HTMLDivElement> document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = false;
  script.defer = true;
  body.appendChild(script);
}

}

