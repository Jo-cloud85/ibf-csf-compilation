import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom, map } from "rxjs";
import { Customer } from "./models";

@Injectable({providedIn: 'root'})
export class HttpService {

    // Method 1
    // constructor(private readonly httpClient: HttpClient) {}

    // Method 2
    private readonly httpClient = inject(HttpClient);

    getHttpBin(name: 'abc'): Observable<any> {
        const queryParams = new HttpParams()
            .set('name', name)
            .set('timestamp', (new Date()).toISOString())

        const httpHeaders = new HttpHeaders().set('X-MY-HEADER', 'fred')

        return this.httpClient.get<any>('https://httpbin.org/get', {params: queryParams, headers: httpHeaders})
    }

    postHttpBin(cust: Customer) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
        return this.httpClient.post<any>('https://httpbin.org/post', cust, {headers: headers})
    }

    postHttpBinAsPromise(cust: Customer) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        // <input type="text" name="name" value="fred">
        // <input type="text" name="email" value="fred@gmail.com">
        const fields = new HttpParams()
            .set('name', cust.name)
            .set('email', cust.email)
        return firstValueFrom<string>(
            this.httpClient.post<any>('https://httpbin.org/post', fields.toString(), {headers: headers})
                .pipe(
                    map(result=> result['data'])
                )
        )
    }

    getHttpBinAsPromise(name: 'abc'): Promise<any> {
        const queryParams = new HttpParams()
            .set('name', name)
            .set('timestamp', (new Date()).toISOString())

        const httpHeaders = new HttpHeaders().set('X-MY-HEADER', 'fred')
        
        return firstValueFrom(
            this.httpClient.get<any>('https://httpbin.org/get', {params: queryParams, headers: httpHeaders})
        )
    }
}