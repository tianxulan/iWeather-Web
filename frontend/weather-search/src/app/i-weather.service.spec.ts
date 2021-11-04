import { TestBed } from '@angular/core/testing';

import { IWeatherService } from './i-weather.service';

describe('IWeatherService', () => {
  let service: IWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
