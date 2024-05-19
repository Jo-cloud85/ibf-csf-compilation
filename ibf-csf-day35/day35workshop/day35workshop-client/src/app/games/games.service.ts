import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { ResponseData } from "./game.model";
// import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    // private apiKey: string = environment.apiKey;
    private endpoint: string = 'http://localhost:8080/games';

    constructor(private http: HttpClient) { }

    getBoardGamesByName(gameName: string): Observable<any> {
        const url = `${this.endpoint}?name=${gameName}`;
        return this.http
            .get<ResponseData>(url)
            // .pipe(
            //     map((responseData: ResponseData) => {
            //         const gamesArray = [];
            //         let index = 1;
            //         for (const key in responseData) {
            //             if (responseData.hasOwnProperty(key)) {
            //                 gamesArray.push({ index: index++, ...responseData[key] });
            //             }
            //         }
            //         return gamesArray;
            //     }),
            //     catchError(errorRes => {
            //         return throwError(() => new Error(errorRes));
            //     })
            // );
    }

}