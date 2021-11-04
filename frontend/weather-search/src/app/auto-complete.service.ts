import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchFormComponent } from './search-form/search-form.component';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  private autoCompleteServiceURL: string ="";
  private urlHead =  "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
  private urlEnd = "&types=(cities)&language=en&components=country:us&key="+environment.googleApiKey;

  constructor(private http:HttpClient) { }

  getAutoComplete(keyword: string)
  {
    this.autoCompleteServiceURL = this.urlHead + keyword + this.urlEnd;
    return this.http.get(this.autoCompleteServiceURL);
  }
}
