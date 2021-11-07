import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map, retry, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddressTransferService } from '../address-transfer.service';
import { AutoCompleteService } from '../auto-complete.service';
import { AutoCompletePair } from '../autoCompletePair';
import { DailyDataTransferService } from '../daily-data-transfer.service';
import { Geocoding } from '../geocoding';
import { GeocodingService } from '../geocoding.service';
import { HourlyDataTransferService } from '../hourly-data-transfer.service';
import { IWeatherService } from '../i-weather.service';
import { IpInfoService } from '../ip-info.service';
import { IWeather } from '../iWeather';
import { LocationTransferService } from '../location-transfer.service';
import { ResultAddress } from '../resultAddress';
import { State } from '../states';
import { StatesService } from '../states.service';
import { IpInfo } from './ip-info';
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public searchForm!: FormGroup;
  spaceOnlyPattern = ".*[^ ].*";
  isAutoDetected = false;
  disableStreet = false;
  stateSelection ="";
  
  
  //for city control
  numberOfCityChanges: number = 0;
  myControl = new FormControl();
  options: AutoCompletePair[] = [];
  filteredOptions: Observable<AutoCompletePair[]>;

  //varibale for services
  states: State[]= [];
  ipInformation: IpInfo = {
    ip: '',
    hostname: '',
    city: '',
    region: '',
    country: '',
    loc: '',
    org: '',
    postal: '',
    timezone: ''
  };
  geocodingInformation:Geocoding = {
    results:[],
    status:""
  };
  autoCompleteInformation:Geocoding ={
    results:[],
    status:""
  }
  daily:any = null; 
  hourly:any = null;
  location:any = null;

  //variable to share with other components
  address: string = "";

  //variablie getting from other services
  latitude: string = "";
  longitude: string = "";
  addressFromGeocoding:string = "";
  constructor(private fb: FormBuilder, private _stateService: StatesService, private _ipInfoService: IpInfoService, private _geocodingService: GeocodingService, private _iWeatherService: IWeatherService, private _autoCompleteService: AutoCompleteService, private _addressTransferService: AddressTransferService, private _dailyDataTransferService: DailyDataTransferService, private _hourlyDataTransferService: HourlyDataTransferService, private _locationTransferService: LocationTransferService) { 
    
    this.searchForm = this.fb.group({
      inputStreet: [{value:'', disabled: false}, Validators.required],
      inputCity: [{value:'', disabled: false}, Validators.required ],
      inputState: [{value:'',disabled: false}, Validators.required ],
      inputCurrent:['']
   });
  
  }
  
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  // On Loading applicaiton
  ngOnInit(): void {
    this._stateService.getStates().subscribe((data: any[]) => { this.states=data});
    this._ipInfoService.getIpInfo().subscribe((data:any) => { this.ipInformation=data});
    this.filteredOptions = this.searchForm.controls["inputCity"].valueChanges.pipe(
      startWith(''),
      map(option => (option ? this._filter(option) : this.options.slice())),
    );
    
    // Transfer Service
    this._addressTransferService.currentAddress.subscribe(address => {
        this.address = address;
    });

    this._locationTransferService.currentLocationData.subscribe(address => {
      this.location = location;
  });

    this._dailyDataTransferService.currentDailyData.subscribe(daily => {
      this.daily = daily;
    });
    this._hourlyDataTransferService.currentHourlyData.subscribe(hourly => {
      this.hourly = hourly;
    });
    
  }

  //fliter for auto complete
  private _filter(value: string): AutoCompletePair[] {
    const filterValue = value.toLowerCase();
    this._autoCompleteService.getAutoComplete(this.searchForm.controls["inputCity"].value).subscribe((data:any) => {
      debounceTime(environment.autoCompleteDelayTime);
        this.options  = data;
        
      
    });
    if (this.searchForm.controls["inputCity"].value == "")
    {
      this.options = [];
    }
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // on user change input on city text field
  cityOnChange()
  {
    this.numberOfCityChanges++;
    console.log("change on city input detected :" + this.numberOfCityChanges);
    
  }
  // On user check auto-detect or unchecked auto-detct
  autoDetectOnCheck()
  {
    if(this.isAutoDetected){
      this.searchForm.controls["inputStreet"].enable();
      this.searchForm.controls["inputCity"].enable();
      this.searchForm.controls["inputState"].enable();
    }
    else
    {
      this.searchForm.controls["inputStreet"].disable();
      this.searchForm.controls["inputCity"].disable();
      this.searchForm.controls["inputState"].disable();
    }
    this.isAutoDetected = !this.isAutoDetected;
  }
  // on user submit search form
 
  onSubmit()
  {
    if(this.isAutoDetected)
    {
      // send address from IPInfo to resultHome
      this.address =  this.ipInformation.city +  ", " + this.ipInformation.region;
      this._addressTransferService.changeAddress(this.address);

      // send loc and lat getting from IpInfo to your node server
      // parse information getting from ipinfo
      var auto_detect_arr = this.ipInformation.loc.split(",");
      this.latitude =auto_detect_arr[0]; 
      this.longitude = auto_detect_arr[1];
      
      this._locationTransferService.changeLocation({"lat":this.latitude, "lng":this.longitude});


      //send to node backend
       this._iWeatherService.getIWeather(this.latitude,this.longitude,"daily").subscribe((data: any) => { 
         this.daily = data; 
         this._dailyDataTransferService.changeDailyData(this.daily);      //send to resultHome through Data TransferSerivce
        });

      
      this._iWeatherService.getIWeather(this.latitude,this.longitude,"hourly").subscribe((data: any) => { this.hourly;});

      
    }
    else
    {
      // send manually address to google geocoding
      var street = this.searchForm.controls["inputStreet"].value;
      var city = this.searchForm.controls["inputCity"].value;
      var state= this.searchForm.controls["inputState"].value;
      
      this._geocodingService.getGeocoding(street,city,state).subscribe((data: any) => {
         this.geocodingInformation=data; 
         // parse results from geocoding
         if (data.status == "OK"){
            this.latitude = data.results[0].geometry.location.lat; 
            this.longitude = data.results[0].geometry.location.lng; 
            this.address = data.results[0].formatted_address;

            this._locationTransferService.changeLocation({"lat":this.latitude, "lng":this.longitude});

            this._addressTransferService.changeAddress(this.address);
            
            this._iWeatherService.getIWeather(this.latitude,this.longitude,"daily").subscribe((data: any) => {
                this.daily =data;
                // !!!! WARNING this is a race Condtion, there is no gurantee data.data will always fine
                // code to process data (Should emit event and send to results component)
                if(data.status == "200")
                {
                  console.log("Daily data received from backend:");
                  console.log(data.data.timelines[0]);
                  this._dailyDataTransferService.changeDailyData(this.daily); 
                }
              } );
            this._iWeatherService.getIWeather(this.latitude,this.longitude,"hourly").subscribe((data: any) => { 
              this.hourly = data;
              // !!!! WARNING this is a race Condtion, there is no gurantee data.data will always be fine
              // code to process data (Should emit event and send to results component)
              if(data.status == "200")
              {
                console.log("Hourly data received from backend:");
                console.log(data.data.timelines[0]);
              }
            });
         }
         else
         {
           

         }
            
           
         
        
         
         
         // upon google geocoding results recived, send the loc and lat to
         // call to backend for daily Service
         
         // call to backend for hourly Service

        });
      
    }
    
  }
  

}

