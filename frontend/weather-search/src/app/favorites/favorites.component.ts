import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressTransferService } from '../address-transfer.service';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { GeocodingService } from '../geocoding.service';
import { HourlyDataTransferService } from '../hourly-data-transfer.service';
import { IWeatherService } from '../i-weather.service';
import { LocationTransferService } from '../location-transfer.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites :any = null;
  latitude: any;
  longitude: any;
  address: any;
  daily: any;
  hourly: any;
  anyFavorite: boolean = false;

  constructor(private route: Router, private _geocodingService: GeocodingService, private _locationTransferService: LocationTransferService, private _addressTransferService: AddressTransferService,private _iWeatherService: IWeatherService, private _dailyDataTransferService: DailyDataTransferService, private _hourlyDataTransferService: HourlyDataTransferService) { }

  ngOnInit(): void {
    this.favorites = this.getAllStorage();
    this.anyFavorite = (this.favorites.length > 0) ? true: false;
  }
  getAllStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( {"city": key, "state":localStorage.getItem(key)});
    }

    return archive;

  }
  deleteStorage(key:string)
  {
    localStorage.removeItem(key);
    this.favorites = this.getAllStorage();
    this.anyFavorite = (this.favorites.length > 0) ? true: false;
  }
  favoriteItemOnClick(favorite:any)
  {
    // send manually address to google geocoding
    var street = "";
    var city = favorite.city;
    var state= favorite.state;
    
    this._geocodingService.getGeocoding(street,city,state).subscribe((data: any) => {
       
       // parse results from geocoding
       if (data.status == "OK"){
          this.latitude = data.results[0].geometry.location.lat; 
          this.longitude = data.results[0].geometry.location.lng; 

          this.address =  this.parseGeocodingToCityState(data.results[0].address_components)
          

          this._locationTransferService.changeLocation({"lat":this.latitude, "lng":this.longitude});

          this._addressTransferService.changeAddress(this.address);
          
          this._iWeatherService.getIWeather(this.latitude,this.longitude,"daily").subscribe((data: any) => {
              this.daily =data;
              // !!!! WARNING this is a race Condtion, there is no gurantee data.data will always fine
              // code to process data (Should emit event and send to results component)
              if(data.status == "200")
              {
                console.log("Daily data received from backend:");
                console.log(data.data.timelines[0]);
                this._dailyDataTransferService.changeDailyData(this.daily); 
              }
            } );
          this._iWeatherService.getIWeather(this.latitude,this.longitude,"hourly").subscribe((data: any) => { 
            this.hourly = data;
            // !!!! WARNING this is a race Condtion, there is no gurantee data.data will always be fine
            // code to process data (Should emit event and send to results component)
            if(data.status == "200")
            {
              console.log("Hourly data received from backend:");
              console.log(data.data.timelines[0]);
            }
         });
       }
       else
       {
         

       }
       
       // upon google geocoding results recived, send the loc and lat to
       // call to backend for daily Service
       
       // call to backend for hourly Service

      });
      this.route.navigate(['/progressBar']);
  }
  parseGeocodingToCityState(arr: any)
  {
    let cityCommaState: string= "";
    arr.forEach(function(component)
    {
      if(component.types[0] == "locality")
      {
          cityCommaState += component.long_name;
          cityCommaState += ", "
      }
      if(component.types[0] == "administrative_area_level_1")
      {
          cityCommaState += component.long_name;
      }

    }
    );
    return cityCommaState;

  }


}
