import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly weatherSvc = inject(WeatherService)

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control<string>('', [ Validators.required])
    })
  }

  getWeather() {
    const city = this.form.value['city']
    console.info('>>> city: ', city)
    this.weatherSvc.getWeatherAsPromise(city)
      .then(results => {
        console.info('>>>> results: ', results)
      })
      .catch(error => {
        console.error('>>>> ERROR: ', error)
      })
  }
}
