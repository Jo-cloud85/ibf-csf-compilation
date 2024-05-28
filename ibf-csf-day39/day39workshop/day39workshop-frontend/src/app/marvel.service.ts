import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { CharDetail, CharInfo, Comment } from "./model";

@Injectable({providedIn: 'root'})
export class MarvelService {

  private readonly httpClient = inject(HttpClient);

  searchCharactersByName(q: string): Observable<CharInfo[]> {
    const params = new HttpParams()
      .set('q', q)

    return this.httpClient.get<CharInfo[]>('http://localhost:8080/api/characters', { params })
  }

  getCharByCharacterId(characterId: number) {
    //console.log(characterId);
    return firstValueFrom(
      this.httpClient.get<CharDetail>(`http://localhost:8080/api/character/${characterId}`)
    )
  }

  postComment(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.post<Comment>(`http://localhost:8080/api/character/${comment.characterId}`, comment);
  }
}