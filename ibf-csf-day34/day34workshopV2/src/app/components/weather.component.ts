import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription, firstValueFrom, skip } from 'rxjs';
import { WeatherData } from '../models';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit, OnDestroy {

  private readonly weatherSvc = inject(WeatherService);

  weather: WeatherData[] = [];
  sub$!: Subscription;

  ngOnInit(): void {
    this.sub$ = this.weatherSvc.onWeather.subscribe(
      result => {
        console.info('>>>> result in weather component: ', result)
        this.weather = result
      }
    )

    // Converting the Subject as observable then convert it to Promise
    // firstValueFrom(this.weatherSvc.onWeather.asObservable()
    //   .pipe(skip(1)))
    //   .then(result => {
    //     console.info('>>>> PROMISE ', result)
    //   }
    // )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
