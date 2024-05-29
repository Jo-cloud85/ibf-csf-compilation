import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SearchResult } from "./models";
import { firstValueFrom, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class GiphyService {

    private readonly http = inject(HttpClient);

    search(q: string): Promise<SearchResult> {
        const params = new HttpParams()
            .set('q', q)

        // string[] => SearchResult
        /* return firstValueFrom(
        // Observable
        this.http.get<string[]>('/api/search', { params })
            .pipe( // .stream()
                map(urls => {
                return {
                    q, urls,
                    date: (new Date()).getTime()
                } as SearchResult
                })
            )
        ) */
        return firstValueFrom(
            this.http.get<string[]>('/api/search', { params })
        ).then((urls: string[]) => {
            return {
                q, 
                urls,
                date: (new Date()).getTime()
            } as SearchResult
        })
    }

}