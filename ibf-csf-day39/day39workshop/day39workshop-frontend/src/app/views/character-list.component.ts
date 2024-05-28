import { Component, inject } from '@angular/core';
import { MarvelService } from '../marvel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharInfo } from '../model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly marvelSvc = inject(MarvelService);

  searchText = '';

  characters: CharInfo[] = [];

  charactersO$ !: Observable<CharInfo[]>

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParams['char']
    console.log(this.searchText)
    if (!this.searchText) {
      this.router.navigate(['/'])
      return
    }
    this.charactersO$ = this.marvelSvc.searchCharactersByName(this.searchText);
  }
}
