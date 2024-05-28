import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MarvelService } from '../marvel.service';
import { CharDetail } from '../model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly marvelSvc = inject(MarvelService);
  private readonly router = inject(Router);

  character$ !: Promise<CharDetail>
  searchText = '';
  characterId !: number;

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParams['char']
    //console.log(">>>> Queryparam: " + this.char);
    //console.log(">>>> Params: " + JSON.stringify(this.activatedRoute.snapshot.params));
    this.characterId = parseInt(this.activatedRoute.snapshot.params['characterId'])
    this.character$ = this.marvelSvc.getCharByCharacterId(this.characterId)
  }

  toComment() {
    this.router.navigate(['/character', this.characterId, 'post-comment']);
  }

}
