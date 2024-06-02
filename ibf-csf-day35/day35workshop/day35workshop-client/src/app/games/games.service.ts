import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { ResponseData } from "./game.model";
// import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    // private apiKey: string = environment.apiKey;
    private endpoint: string = 'http://localhost:8080/games';

    constructor(private http: HttpClient) {}

    getBoardGamesByName(gameName: string): Observable<any> {
        const queryParams = new HttpParams()
            .set("name", gameName)
        return this.http.get<ResponseData>(this.endpoint, {params: queryParams})
    }

    getGameDetailsById(gameId: string): Observable<any> {
        const url = `${this.endpoint}/${gameId}`;
        return this.http.get<any>(url).pipe(
            tap({
                next: (data) => console.log('Game Details:', data),  
                error: (error) => console.log('>>> ERROR:', error.message) 
            })
        );
    }
}