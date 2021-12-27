import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IpInfo } from './search-form/ip-info';
import { SearchFormComponent } from './search-form/search-form.component';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IpInfoService {
  private ipInfoServiceURL: string = "https://ipinfo.io/json?token=" + environment.ipinfoApiKey; 

  constructor(private http:HttpClient) {}
  getIpInfo()
  {
    return this.http.get<IpInfo[]>(this.ipInfoServiceURL);
  }

}
