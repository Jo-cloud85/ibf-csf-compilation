import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, firstValueFrom, map, tap } from "rxjs";
import { WeatherData } from "./models";

@Injectable({providedIn: 'root'})
export class WeatherService {

    private readonly httpClient = inject(HttpClient);

    onWeather = new Subject<WeatherData[]>();

    // Using Observable
    getWeather(city: string): Observable<WeatherData[]> {
        const queryString = new HttpParams()
            .set('q', city)
            .set('appid', 'your openweathermap key')
    
        return this.httpClient.get<WeatherData[]>('https://api.openweathermap.org/data/2.5/weather'
            , { params: queryString })
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
            .set('appid', 'ddb5d91604d2bdf2a0c6752fae78bacc')
    
        return firstValueFrom(
          this.httpClient.get<WeatherData[]>('https://api.openweathermap.org/data/2.5/weather'
              , { params: queryString })
            .pipe(
              tap(result => console.info('BEFORE: ', result)),
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
                // firing the onWeather with result
                this.onWeather.next(result)
              }) // WeatherData[]
            ) // pipe() -> Observable<WeatherData[]>
          ) // firstValueFrom() -> Promise<WeatherData[]>
    }
}
