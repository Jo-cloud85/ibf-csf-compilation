import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.css'
})
export class CatComponent implements OnInit, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute);
  // private readonly router = inject(Router);

  width = 100;
  sub$ !: Subscription;

  ngOnInit(): void {
    this.sub$ = this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.width = 100;
        if (!!queryParams['size'])
          this.width = parseInt(queryParams['size'])
      }
    )
  }

  ngOnDestroy(): void {
      
  }
}
