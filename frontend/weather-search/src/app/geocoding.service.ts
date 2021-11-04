import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SearchFormComponent } from './search-form/search-form.component';
import { HttpParameterCodec } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GeocodingService {
  //private geocodingServiceURL:string="https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAqP8OpmUqIOMrodKUcxBnyf76_P8waij4";
  private geocodingServiceURL:string="";
  private geocodingHead:string = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  private geocodingAPIKey:string="&key=AIzaSyAqP8OpmUqIOMrodKUcxBnyf76_P8waij4"
  constructor(private http:HttpClient) {}
  getGeocoding(street:string, city:string, state:string)
  {
    this.geocodingServiceURL = this.geocodingHead + encodeURI(street+","+city+","+state).replace(/%20/g, "+") +this.geocodingAPIKey ;
    return this.http.get(this.geocodingServiceURL);
  }
}
