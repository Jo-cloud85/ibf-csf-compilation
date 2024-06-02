import { Component, inject } from '@angular/core';
import { GamesService } from './games.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent {

  private readonly gamesSvc = inject(GamesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  gameId: string = '';

  sub$!: Subscription;

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.params['gameId'];
    console.log(this.gameId);
    this.sub$ = this.gamesSvc.getGameDetailsById(this.gameId)
      .subscribe({
        next: (value: any) => console.log(value),
        error: (err: HttpErrorResponse) => console.log(">>> ERROR: ", err.message),
        complete: () => this.sub$.unsubscribe()
      });
  }
}
