import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PolarBearService } from './polarbear.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly router = inject(Router);

  private readonly polarBearSvc = inject(PolarBearService);

  dogBreeds=['puppy1', 'puppy2'];

  ngOnInit(): void {
    // this.title.setTitle('Main');
  }

  bigCat(){
    const queryParams = { size: 600 }
    this.router.navigate(['/cat'], { queryParams })
  }

  polarBear(){
    this.polarBearSvc.image='/assets/polarbear.jpeg'
    this.router.navigate(['/polarbear'])
  }

}