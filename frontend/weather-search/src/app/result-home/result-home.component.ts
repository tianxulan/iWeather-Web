import { Component, OnInit } from '@angular/core';
import { AddressTransferService } from '../address-transfer.service';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { DayIndexTransferService } from '../day-index-transfer.service';
import { LocationTransferService } from '../location-transfer.service';

@Component({
  selector: 'app-result-home',
  templateUrl: './result-home.component.html',
  styleUrls: ['./result-home.component.css']
})
export class ResultHomeComponent implements OnInit {
  address: string = "";
  city :string = "";
  state: string = "";
  isBiStar = true;
  isBiStarFill = false;
  isFavorite = false;
  daily: any = null;
  dayIndex: number = 0;
  loaded: boolean = false;
  location:string = "";
  constructor(private _addressTransferService: AddressTransferService, private _dayIndexTransferService: DayIndexTransferService, private _locationTransferService: LocationTransferService) {}
  

  ngOnInit(): void {
    this._addressTransferService.currentAddress.subscribe(address => {
        this.address = address;
        let arr = address.split(',');
        this.city = arr[0].trim();
        this.state = arr[1].trim();

        //render fill/unfill of star
        if(localStorage.getItem(this.city)!= null)
      {
        this.isBiStar = false;
        this.isBiStarFill = true;
        this.isFavorite = true;

      }
      else
      {
        this.isBiStar = true;
        this.isBiStarFill = false;
        this.isFavorite = false;
      }
    });
    this._dayIndexTransferService.currentDayIndex.subscribe(dayIndex => {
      this.dayIndex = dayIndex;
    })
    this._locationTransferService.currentLocationData.subscribe(location =>{
      console.log(location.lat);
      console.log(location.lng);
      this.location = location.lat + ',' +  location.lng;
    })
    
    
  }
  starOnClick()
  {
    if(this.isFavorite)
    {
      localStorage.removeItem(this.city);
    }
    else
    {
      localStorage.setItem(this.city,this.state); 
    }
    this.isBiStar = !this.isBiStar;
    this.isBiStarFill = !this.isBiStarFill; 
    this.isFavorite = !this.isFavorite;
  }

}
