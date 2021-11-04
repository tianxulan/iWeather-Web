import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SearchFormComponent } from './search-form/search-form.component';
import { IWeather } from './iWeather';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IWeatherService {
  private iWeatherServiceURL: string ="";
  private iWeatherURLHead = "/search?" 

  constructor(private http:HttpClient) { }

    getIWeather(latitude:string,longitude:string,type:string)
  {
    if(environment.queryExample)
    {
       this.iWeatherServiceURL = environment.apiUrl +"/" + type + "Example.json";
    }
    else
    {
      this.iWeatherServiceURL = environment.apiUrl + this.iWeatherURLHead + "latitude="+latitude +"&longitude="+longitude + "&type=" + type;
    }
    console.log("Query URL for this time runing: " + this.iWeatherServiceURL);
    return  this.http.get<IWeather>(this.iWeatherServiceURL);

  }
}
