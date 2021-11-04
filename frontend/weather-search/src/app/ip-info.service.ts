import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IpInfo } from './search-form/ip-info';
import { SearchFormComponent } from './search-form/search-form.component';
@Injectable({
  providedIn: 'root'
})
export class IpInfoService {
  private ipInfoServiceURL: string = "https://ipinfo.io/json?token=00e03accd89690"; 

  constructor(private http:HttpClient) {}
  getIpInfo()
  {
    return this.http.get<IpInfo[]>(this.ipInfoServiceURL);
  }

}
