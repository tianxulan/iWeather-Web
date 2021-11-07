import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StatesService } from './states.service';
import { HttpClientModule} from '@angular/common/http';
import { IpInfoService } from './ip-info.service';
import { GeocodingService } from './geocoding.service';
import { IWeatherService } from './i-weather.service';
import { AutoCompleteService } from './auto-complete.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {  MatInputModule } from '@angular/material/input';
import { RfNavComponent } from './rf-nav/rf-nav.component';
import { ResultHomeComponent } from './result-home/result-home.component';
import { ResultDayComponent } from './result-day/result-day.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { DayViewComponent } from './day-view/day-view.component';
import { DailyTempComponent } from './daily-temp/daily-temp.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { AddressTransferService } from './address-transfer.service';
import { DailyDataTransferService } from './daily-data-transfer.service';
import { HourlyDataTransferService } from './hourly-data-transfer.service';
const routes: Routes = 
[
  {
    path: 'resultHome',
    component: ResultHomeComponent,
    children:[
      {
        path:'dayView', component:DayViewComponent
      },
      {
        path:'dailyTemp', component:DailyTempComponent
      },
      {
        path:'meteogram', component:MeteogramComponent
      }
    ]
  },
  {
    path: 'resultDay/:dayIndex',
    component: ResultDayComponent
  }, 
  {
    path: 'favorites',
    component: FavoritesComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    RfNavComponent,
    ResultHomeComponent,
    ResultDayComponent,
    FavoritesComponent,
    DayViewComponent,
    DailyTempComponent,
    MeteogramComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StatesService, IpInfoService,GeocodingService,IWeatherService,AutoCompleteService,AddressTransferService,DailyDataTransferService,HourlyDataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
