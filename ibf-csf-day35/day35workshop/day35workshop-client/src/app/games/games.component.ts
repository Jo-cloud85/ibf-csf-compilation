import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from './games.service';
import { Game } from './game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {

  gameSearchForm!: FormGroup;
  gameList: Game[] = [];
  displayedGames: Game[] = [];
  currentPage: number = 1; //setting this to default first 
  gamesPerPage: number = 5; //setting this to default first
  totalPages: number = 0;

  constructor(
    private formbuilder: FormBuilder,
    private gameService: GamesService
  ){}

  ngOnInit(): void {
    this.gameSearchForm = this.formbuilder.group({
      gameName: [''],
      gamesPerPage: [5] // Default value for games per page
    })
  }

  getGameList(gameName: string): void {
    this.gameService.getBoardGamesByName(gameName).subscribe(
      (data: any) => {  
        this.gameList = data.games; //this.gameList is a list of objects w/ index
        // for (let i = 0; i < data.games.length; i++) {
        //   console.log(data.games[i].name); // Each game obj returned fr server has a 'name' property
        // }
        this.updateDisplayedGames();
      },
      (error: string) => {
        console.error('Error fetching game list data', error);
      }
    );
  }

  onSearch(): void {
    const game = this.gameSearchForm.get('gameName')?.value;
    if (game) {
      this.getGameList(game);
    }
  }

  updateDisplayedGames(): void {
    const startIndex = (this.currentPage - 1) * this.gamesPerPage;
    const endIndex = startIndex + this.gamesPerPage;
    this.displayedGames = this.gameList
      .slice(startIndex, endIndex)
      .map((game, idx) => ({
        ...game,
        index: startIndex + idx + 1
    }));
  }

  changePageSize(): void {
    // setting the currentPage back to 1 is also VERY IMPT else when you click
    // next, you will show the entire rest of the result
    this.currentPage = 1;
    // converting this to Number is VERY IMPT as .value can return a string
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
