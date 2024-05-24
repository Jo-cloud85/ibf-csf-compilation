import { Component, inject } from '@angular/core';
import { GameDetail } from "../models";
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.css'
})
export class ListCommentsComponent {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly gameSvc = inject(GamesService)

  game$!: Promise<GameDetail>
  q = ''
  gameId = 0

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.queryParams['q']
    this.gameId = parseInt(this.activatedRoute.snapshot.params['gameId'])
    this.game$ = this.gameSvc.getGameByGameId(this.gameId)
  }
}
