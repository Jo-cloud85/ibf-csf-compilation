import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesService } from './games.service';
import { Game } from './game.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {

  searchText='';

  gameSearchForm!: FormGroup;
  gameList: Game[] = [];
  displayedGames: Game[] = [];
  currentPage: number = 1; //setting this to default first 
  gamesPerPage: number = 5; //setting this to default first
  totalPages: number = 0;


  sub$ !: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private gameService: GamesService
  ){}

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParams['gameName']
    console.log(this.searchText);
    this.gameSearchForm = this.formbuilder.group({
      gameName: this.formbuilder.control<string>('', Validators.required),
      gamesPerPage: this.formbuilder.control<number>(5) // Default value for games per page
    })
  }

  onSearch(): void {
    const game = this.gameSearchForm.get('gameName')?.value;
    if (game) {
      this.getGameList(game);
    }
  }

  private getGameList(gameName: string): void {
    this.sub$ = this.gameService.getBoardGamesByName(gameName)
      .subscribe({
        next: (data: any) => {  
          this.gameList = data.games; //this.gameList is a list of objects w/ index
          // console.log(this.gameList)
          this.updateDisplayedGames();
        },
        error: (error: string) => {
          console.error('Error fetching game list data', error);
        },
        complete: () => this.sub$.unsubscribe()
      });
  }

  private updateDisplayedGames(): void {
    const startIndex = (this.currentPage - 1) * this.gamesPerPage;
    const endIndex = startIndex + this.gamesPerPage;
    this.displayedGames = this.gameList
      .slice(startIndex, endIndex)
      .map((game, idx) => ({
        ...game,
        index: startIndex + idx + 1
    }));
    // console.log(this.displayedGames);
  }

  changePageSize(): void {
    // Setting the currentPage back to 1 is also VERY IMPT else when you click
    // next, you will show the entire rest of the result
    this.currentPage = 1;
    // Converting this to Number is VERY IMPT as .value can return a string
    this.gamesPerPage = Number(this.gameSearchForm.get('gamesPerPage')?.value);
    this.updateDisplayedGames();
}

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedGames();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.gameList.length / this.gamesPerPage);
    //console.log("Total page: " + totalPages);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedGames();
      //console.log("Current page: " + this.currentPage);
    }
  }
}
