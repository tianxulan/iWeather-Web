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
  private urlHead =  environment.apiUrl + "/autoComplete?keyword="

  constructor(private http:HttpClient) { }

  getAutoComplete(keyword: string)
  {
    if (environment.queryExample)
    {
      this.autoCompleteServiceURL = environment.apiUrl +"/autoCompleteExample.json";
    
    }
    else
    {
      this.autoCompleteServiceURL = this.urlHead + keyword;
    }
    
    return this.http.get(this.autoCompleteServiceURL);
  }
}
