import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent implements OnInit{
  city : string = '';
  weather !: any;
  iconUrl !: string;
  private subscription !: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private weatherService: WeatherService) {}
  
  ngOnInit(): void {
    this.getWeather();
  }

  // Method 1 - Using Promise
  getWeather(): void {
    this.route.paramMap
      .subscribe({
          next: (params: any) => {
            this.city = params.get('city')!;
            this.weatherService.getWeatherByCityNameUsingPromise(this.city)
              .then(data => {
                this.weather = data;
                const iconCode = this.weather.weather[0].icon;
                this.iconUrl = this.weatherService.getIconUrl(iconCode);
              })
              .catch((error: HttpErrorResponse) => {
                console.error('Error fetching weather data', error.message);
              })
          },
          error:(error: HttpErrorResponse) => {
            console.error('Error fetching weather data', error.message);
          },
          complete: () => {
            this.subscription.unsubscribe();
          }
      })
  }
}
