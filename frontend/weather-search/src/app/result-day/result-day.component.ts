import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressTransferService } from '../address-transfer.service';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { DayIndexTransferService } from '../day-index-transfer.service';
import { LocationTransferService } from '../location-transfer.service';
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
  mapWidth:string = "100%";
  mapHeight:string = "500";
  
  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom : 14
  }
  marker = {
    position: { lat: 0, lng: 0 },
  }
  constructor(private route: ActivatedRoute, private _dailyDataTransferService: DailyDataTransferService, private _addressTransferService: AddressTransferService, private _locationTransferService:LocationTransferService, private _dayIndexTransferService: DayIndexTransferService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dayIndex = +params.get("dayIndex");
      this._dayIndexTransferService.changeDayIndex(this.dayIndex);
    })

    this._addressTransferService.currentAddress.subscribe(address => {
      this.address = address;
    });
    this._dayIndexTransferService.currentDayIndex.subscribe(dayIndex => {
      this.dayIndex = dayIndex;
    });


    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
      this.singleDayData = daily.data.timelines[0].intervals[this.dayIndex];
      console.log(this.singleDayData);
      let formattedDt = formatDate(new Date(this.singleDayData.startTime), 'EEEE, dd MMM y', 'en_US')
      let text:string = `https://twitter.com/intent/tweet?text=The temperature in ${this.address} on ${formattedDt} is ${this.singleDayData.values.temperatureApparent} °F. The weather conditions are ${weatherCodesDescript[this.singleDayData.values.weatherCode]}`
      this.twitterText = encodeURI(text+"&hashtags=CSCI571WeatherForecast");
    });

    this._locationTransferService.currentLocationData.subscribe(location =>{
      console.log(location.lat);
      console.log(location.lng);
      this.mapOptions.center.lat = Number(location.lat);
      this.mapOptions.center.lng = Number(location.lng);
      this.marker.position.lat = Number(location.lat);
      this.marker.position.lng = Number(location.lng);
    })
    

  }
  
  
  

}
