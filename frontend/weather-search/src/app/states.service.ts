import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { State } from './states';
@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private statesServiceURL: string = environment.apiUrl + "/states.json";
  constructor(private http:HttpClient) {}

  getStates()
  {
    return this.http.get<State[]>(this.statesServiceURL);
    // return 
    // return [
    //   {"name":"California", "abbreviation":"CA"},
    //   {"name":"Arizona", "abbreviation":"AZ"}
    // ];
  }
}
