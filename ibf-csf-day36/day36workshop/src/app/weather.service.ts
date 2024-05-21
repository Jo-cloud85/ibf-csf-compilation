import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, firstValueFrom, map, of } from "rxjs";
import { environment } from "./environments/environment";
import { Weather } from "./weather-details/weather.model";

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey: string = environment.apiKey;
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient) { }

  // getWeatherByCityNameUsingObservable(city: string): Observable<Weather> {
  //     const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //     return this.httpClient.get<Weather>(url);
  // }

  getWeatherByCityNameUsingPromise(city: string): Promise<Weather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
    return firstValueFrom(
      this.httpClient.get<Weather>(this.apiUrl, {params: params})
    )
  }

  getIconUrl(iconCode: string): string {
      return `http://openweathermap.org/img/wn/${iconCode}.png`;
  }

  isCityValid(city: string): Observable<boolean> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.httpClient
      .get<Weather>(url)
      .pipe(
        map(response => !!response),
        catchError(() => of(false))
      );
  }
}