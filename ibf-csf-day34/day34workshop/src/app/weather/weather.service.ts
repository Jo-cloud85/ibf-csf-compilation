import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey: string = environment.apiKey;
    private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) { }

    getWeatherByCityName(city: string): Observable<any> {
        const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
        return this.http.get(url);
    }

    getIconUrl(iconCode: string): string {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    }
}