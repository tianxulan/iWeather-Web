import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor() { }
  getStates()
  {
    return [
      {"fullName":"California", "abbreviation":"CA"},
      {"fullName":"Arizona", "abbreviation":"AZ"}
    ];
  }
}
