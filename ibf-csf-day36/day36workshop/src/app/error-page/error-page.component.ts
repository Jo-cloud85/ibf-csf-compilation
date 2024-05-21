import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit{
  errorMessage !: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Both would work but then if the data doesn't change, then using the snapshot is fine
    // Just rmb, must match your 'data' in app-routing.module
    // This is just illustrating how we can pass static data to a route

    // Method 1
    // this.errorMessage =  this.route.snapshot.data['message'];

    // Method 2
    this.route.data.subscribe((data: Data) => {
        this.errorMessage = data['message'];
      }
    )
  }
}
