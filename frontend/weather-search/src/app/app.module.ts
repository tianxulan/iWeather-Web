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
@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StatesService, IpInfoService,GeocodingService,IWeatherService,AutoCompleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
