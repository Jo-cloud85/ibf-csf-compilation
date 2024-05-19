import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string = '';
  weather!: any;
  iconUrl: string = '';
  citySearchForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.citySearchForm = this.formbuilder.group({
      city: ''
    })
  }

  getWeather(city: string): void {
    this.weatherService.getWeatherByCityName(city).subscribe(
      (data: any) => {
        this.weather = data;
        const iconCode = this.weather.weather[0].icon;
        this.iconUrl = this.weatherService.getIconUrl(iconCode);
        console.log(this.weather);
      },
      (error: string) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  onSearch(): void {
    const city = this.citySearchForm.get('city')?.value;
    if (city) {
      this.getWeather(city);
    }
  }
}
