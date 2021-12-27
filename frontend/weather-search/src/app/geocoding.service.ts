import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SearchFormComponent } from './search-form/search-form.component';
import { HttpParameterCodec } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GeocodingService {
  private geocodingServiceURL:string="";
  private geocodingHead:string = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  private geocodingAPIKey:string="&key=" + environment.googleApiKey;
  constructor(private http:HttpClient) {}
  getGeocoding(street:string, city:string, state:string)
  {
    this.geocodingServiceURL = this.geocodingHead + encodeURI(street+","+city+","+state).replace(/%20/g, "+") +this.geocodingAPIKey ;
    return this.http.get(this.geocodingServiceURL);
  }
}
