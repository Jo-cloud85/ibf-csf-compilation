import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Weather } from './weather.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  citySearchForm!: FormGroup;
  city: string = '';
  weather!: any;
  iconUrl: string = '';

  //private sub !: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.citySearchForm = this.formbuilder.group({
      city: ''
    })
  }

  // Method 1 - Using Observable
  // getWeather(city: string): void {
  //   this.sub = this.weatherService.getWeatherByCityNameUsingObservable(city)
  //     .subscribe(
  //       {
  //         next: (data: any) => {
  //           this.weather = data;
  //           const iconCode = this.weather.weather[0].icon;
  //           this.iconUrl = this.weatherService.getIconUrl(iconCode);
  //         },
  //         error: (error: string) => {
  //           console.error('Error fetching weather data', error);
  //         },
  //         complete: () => {
  //           this.sub.unsubscribe();
  //         }
  //       },
  //   );
  // }
  
  // Method 2 - Using Promise
  getWeather(city: string): void {
    this.weatherService.getWeatherByCityNameUsingPromise(city)
      .then((data: any) => {
          this.weather = data;
          const iconCode = this.weather.weather[0].icon;
          this.iconUrl = this.weatherService.getIconUrl(iconCode);
          // console.log(this.weather);
        }
      )
      .catch((error: HttpErrorResponse) => {
        console.error('Error fetching weather data', error.message);
      })
  }

  onSearch(): void {
    const city = this.citySearchForm.get('city')?.value;
    if (city) {
      this.getWeather(city);
    }
  }
}
