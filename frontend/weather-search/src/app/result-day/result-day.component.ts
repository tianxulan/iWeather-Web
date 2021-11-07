import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressTransferService } from '../address-transfer.service';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { weatherCodesDescript } from '../weatherCodesDescript';

@Component({
  selector: 'app-result-day',
  templateUrl: './result-day.component.html',
  styleUrls: ['./result-day.component.css']
})
export class ResultDayComponent implements OnInit {
  dayIndex :number = 0;
  singleDayData : any = null;
  address: string = "";
  twitterText:string="";

  constructor(private route: ActivatedRoute, private _dailyDataTransferService: DailyDataTransferService, private _addressTransferService: AddressTransferService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dayIndex = +params.get("dayIndex");
    })

    this._addressTransferService.currentAddress.subscribe(address => {
      this.address = address;
    });

    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
      this.singleDayData = daily.data.timelines[0].intervals[this.dayIndex];
      console.log(this.singleDayData);
      let formattedDt = formatDate(new Date(this.singleDayData.startTime), 'EEEE, dd MMM y', 'en_US')
      let text:string = `https://twitter.com/intent/tweet?text=The temperature in ${this.address} on ${formattedDt} is ${this.singleDayData.values.temperatureApparent} °F. The weather conditions are ${weatherCodesDescript[this.singleDayData.values.weatherCode]}`
      this.twitterText = encodeURI(text+"&hashtags=CSCI571WeatherForecast");
    });

    

  }
  

}
