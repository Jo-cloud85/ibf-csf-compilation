import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { SearchResult } from '../models';
import { GiphyService } from '../giphy.service';
import { GiphyStore } from '../giphy.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly giphySvc = inject (GiphyService);
  private readonly giphyStore = inject(GiphyStore);

  q = '';
  result$!: Promise<SearchResult>

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.queryParams['q']
    this.result$ = this.giphySvc.search(this.q)
  }

  save(){
    this.result$
      .then(result => {
        this.giphyStore.saveResult(result)
        this.router.navigate(['/'])
      })
  }
}
