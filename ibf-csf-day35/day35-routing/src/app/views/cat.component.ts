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

  width = 100;
  sub$ !: Subscription;

  ngOnInit(): void {
    //queryParams is the one with ?, params is just /
    this.sub$ = this.activatedRoute.queryParams.subscribe( 
      (queryParams: any) => {
        this.width = 100;
        // Means if I type http://localhost:4200/cat?size=300. Else if I never add ?size=, just use width = 100
        if (!!queryParams['size']) 
          this.width = parseInt(queryParams['size'])
      }
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
