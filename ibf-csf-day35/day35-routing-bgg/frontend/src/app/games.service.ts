import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GameDetail, GameInfo } from "./models";
import { Observable, firstValueFrom } from "rxjs";

@Injectable()
export class GamesService {

  private readonly http = inject(HttpClient)

  searchGamesByName(q: string): Observable<GameInfo[]> {
    const myparams = new HttpParams()
        .set('q', q)

    return this.http.get<GameInfo[]>('/api/search', { params: myparams })
  }

  // Converting Observable (above) to a Promise
  searchGamesByNameAsPromise(q: string): Promise<GameInfo[]> {
    return firstValueFrom(this.searchGamesByName(q))
  }

  getGameByGameId(gameId: number): Promise<GameDetail> {
    return firstValueFrom(
      this.http.get<GameDetail>(`/api/game/${gameId}`)
    )
  }
}
