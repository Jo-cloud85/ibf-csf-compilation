import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, firstValueFrom, map, tap } from "rxjs";
import { WeatherData } from "./models";
import { environment } from "./environments/environment";

@Injectable({providedIn: 'root'})
export class WeatherService {

    private readonly httpClient = inject(HttpClient);

    // Subject can serve as an observable, thus, we can subscribe to it
    /* 
    When you call getWeatherAsPromise in CityComponent, the onWeather subject in WeatherService emits the data, which is
    then available for any component subscribing to it, including WeatherComponent. 

    Here’s a detailed breakdown of how the data flows between the components and service:

    CityComponent:
      - CityComponent has a form where the user can enter a city name.
      - When the user submits the form, getWeatherAsPromise() is called with the entered city name.

    WeatherService:
      - getWeatherAsPromise() from WeatherService fetches the weather data from the API and then uses the tap operator to 
        emit this data via its onWeather subject.
      - This subject can have multiple subscribers and will emit data to all of them whenever it receives new data.

    WeatherComponent:
      - WeatherComponent subscribes to weatherSvc.onWeather in its ngOnInit method.
      - As soon as CityComponent calls getWeatherAsPromise() and the data is fetched and emitted by the onWeather 
        subject, WeatherComponent receives this data by subscribing to it and updates its weather property.
    */

    onWeather = new Subject<WeatherData[]>(); 

    // Using Observable
    getWeather(city: string): Observable<WeatherData[]> {
        const queryString = new HttpParams()
            .set('q', city)
            .set('appid', environment.apiKey)
    
        return this.httpClient.get<WeatherData[]>(
          'https://api.openweathermap.org/data/2.5/weather', { params: queryString })
          .pipe(
            map((result: any) =>
              (result['weather'] as any[]) // cast to an array
                .map(value => {
                  return {
                    icon: value['icon'],
                    main: value['main'],
                    description: value['description'],
                  } as WeatherData
                }) // WeatherData[]
            ), // map()
            tap(result => {
              console.info(">>> in tap: ", result)
            })
          ) // pipe() -> Observable<WeatherData[]>
    }

    // Using Promise
    getWeatherAsPromise(city: string): Promise<WeatherData[]> {
        const queryString = new HttpParams()
            .set('q', city)
            .set('appid', environment.apiKey)
    
        return firstValueFrom(
          this.httpClient.get<WeatherData[]>(
            'https://api.openweathermap.org/data/2.5/weather', { params: queryString })
            .pipe(
              tap(result => console.info('BEFORE: ', result)), //which is the entire weather data
              map((result: any) =>
                (result['weather'] as any[]) //cast to an array
                  .map(value => {
                    return {
                      icon: value['icon'],
                      main: value['main'],
                      description: value['description'],
                    } as WeatherData
                  }) // WeatherData[]
              ), // map()
              tap(result => {
                console.info(">>> in tap: ", result)
                // firing the onWeather with result (onWeather is a Subject)
                this.onWeather.next(result)
              }) // WeatherData[]
            ) // pipe() -> Observable<WeatherData[]>
          ) // firstValueFrom() -> Promise<WeatherData[]>
    }
}
