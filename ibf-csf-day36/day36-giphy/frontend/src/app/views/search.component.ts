import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { SearchResult } from '../models';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly giphySvc = inject (GiphyService);

  q = '';
  result$!: Promise<SearchResult>

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.queryParams['q']
    this.result$ = this.giphySvc.search(this.q)
  }
}
