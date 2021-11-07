import { Component, OnInit } from '@angular/core';
import { AddressTransferService } from '../address-transfer.service';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { DayIndexTransferService } from '../day-index-transfer.service';

@Component({
  selector: 'app-result-home',
  templateUrl: './result-home.component.html',
  styleUrls: ['./result-home.component.css']
})
export class ResultHomeComponent implements OnInit {
  address: string = "";
  isBiStar = true;
  isBiStarFill = false;
  isFavorite = false;
  daily: any = null;
  dayIndex: number = 0;
  constructor(private _addressTransferService: AddressTransferService, private _dayIndexTransferService: DayIndexTransferService ) {}
  

  ngOnInit(): void {
    this._addressTransferService.currentAddress.subscribe(address => {
        this.address = address;
    });
    this._dayIndexTransferService.currentDayIndex.subscribe(dayIndex => {
      this.dayIndex = dayIndex;
    })
    
  }
  starOnClick()
  {
    this.isBiStar = !this.isBiStar;
    this.isBiStarFill = !this.isBiStarFill; 
    this.isFavorite = !this.isFavorite;
  }

}
