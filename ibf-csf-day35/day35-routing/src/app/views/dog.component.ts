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
    /* You realise because this is a snapshot, when you click puppy1, the console prints puppy1, but when u 
    click puppy2, nothing gets printed. This is because the snapshot only works the first time */
    // const b = this.activatedRoute.snapshot.params['breed'];
    // console.log(b);
    
    // save subscription references
    // queryParams is the one with ?, params is just /
    this.sub$ = this.activatedRoute.params.subscribe( params => {
      this.breed = params['breed']
      this.title.setTitle(this.breed)
      this.dogImg =`/assets/${this.breed}.jpeg`;
      console.log(this.breed)
    })
  }

  // back(){
  //   this.router.navigate(['/'])
  // }

  ngOnDestroy(): void {
    console.log("OnDestroy activated... Leaving component...")
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
