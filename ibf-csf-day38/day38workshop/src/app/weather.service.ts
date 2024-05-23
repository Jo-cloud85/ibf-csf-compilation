import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, firstValueFrom, map, of } from "rxjs";
import { environment } from "./environments/environment";

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey: string = environment.apiKey;
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient) {}

  /* Any non-null and non-undefined value will become true after applying !! because the first ! converts the value to false, and the second ! converts false back to true. */

  // Method 1 - Observable
  // isCityValidUsingObservable(city: string): Observable<boolean> {
  //   const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //   return this.httpClient
  //     .get<Weather>(url)
  //     .pipe(
  //       map(response => !!response),
  //       catchError(() => of(false))
  //     );
  // }

  // Method 2 - Promise
  isCityValidUsingPromise(city: string): Promise<boolean> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
    return firstValueFrom(
      this.httpClient
        .get<{city: string}>(this.apiUrl, {params: params})
        .pipe(
          map(response => !!response),
          catchError(() => of(false))
        )
    )
  }

  // Method 1 - Observable
  // getWeatherByCityNameUsingObservable(city: string): Observable<Weather> {
  //     const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //     return this.httpClient.get<Weather>(url);
  // }

  // Method 2 - Promise
  getWeatherByCityNameUsingPromise(city: string): Promise<{city: string}> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
    return firstValueFrom(
      this.httpClient.get<{city: string}>(this.apiUrl, {params: params})
    )
  }

  getIconUrl(iconCode: string): string {
      return `http://openweathermap.org/img/wn/${iconCode}.png`;
  }
}