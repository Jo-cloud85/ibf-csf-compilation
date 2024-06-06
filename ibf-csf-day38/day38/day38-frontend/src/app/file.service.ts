import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FileService {

    private readonly httpClient = inject(HttpClient);

    uploadFile(formData: FormData): Observable<any> {
        //console.log("FormData in service: ", formData.get('myfile'));
        return this.httpClient.post('http://localhost:3000/uploads3', formData);
    }
}