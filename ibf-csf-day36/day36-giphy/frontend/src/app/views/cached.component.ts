import { GiphyService } from './../giphy.service';
import { Component, inject } from '@angular/core';
import { GiphyStore } from '../giphy.store';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SearchResult } from '../models';

@Component({
  selector: 'app-cached',
  templateUrl: './cached.component.html',
  styleUrl: './cached.component.css'
})
export class CachedComponent {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly giphyStore = inject(GiphyStore)

  q='';

  result$!: Observable<SearchResult | undefined>

  // Using filter
  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.params['q']
    this.result$ = this.giphyStore.getSavedSearchesByQ(this.q);
    // this.result$ = this.giphyStore.getFullSavedSearches.pipe(
    //   map(searches => searches.filter(s => s.q == this.q))
    // )
  }

  // Using find
  // ngOnInit(): void {
  //   this.q = this.activatedRoute.snapshot.params['q']
  //   this.giphyStore.getFullSavedSearches.pipe(
  //     map(searches => searches.find(s => s.q == this.q))
  //   )
  // }
}
