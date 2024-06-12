import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {

    baseURL : string = 'http://localhost:8080/api';

    private readonly httpClient = inject(HttpClient);

    uploadPost(formData: FormData): Promise<any> {
        return firstValueFrom(
          this.httpClient.post(`${this.baseURL}/post`, formData)
        )
    }
  
    getPostById(postId: String): Observable<any> {
        return this.httpClient.get(`${this.baseURL}/post/${postId}`)
    }
}