import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.css'
})
export class DogComponent implements OnInit, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  dogImg=''
  breed=''
  sub$ !: Subscription;

  ngOnInit(): void {
    console.log("OnInit activated... Entering component...")
    const b = this.activatedRoute.snapshot.params['breed'];
    
    // save subscription references
    // queryParams is the one with ?, params is just /
    this.activatedRoute.params.subscribe( 
      params => {
        // console.log(this.breed)
        this.breed = params['breed']
        this.title.setTitle(this.breed)
        this.dogImg =`/assets/${this.breed}.jpeg`;
      } 
    )
  }

  back(){
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    console.log("OnDestroy activated... Leaving component...")
    this.sub$.unsubscribe();
  }
}
