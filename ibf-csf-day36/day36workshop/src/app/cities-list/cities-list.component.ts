import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent implements OnInit {
  addCityForm !: FormGroup;
  city !: string;
  citiesList: string[] = ['Singapore', 'Kuala Lumpur', 'Tokyo', 'Bangkok', 'Hong Kong', 'Beijing'];

  private subscription !: Subscription;
  
  constructor(
    private formbuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router) {}

  ngOnInit(): void {
    this.addCityForm = this.formbuilder.group({
      city: this.formbuilder.control<string>('', [Validators.required])
    })
  }

  /* 
  This mtd should check for 2 things:
     - Whether the city exist -> throw 'city not found' error
     - Whether there is a duplicate -> throw 'you have already added this city' error
  */
  // Method 1 - Observable
  // addCity() {
  //   const city = toTitleCase(this.addCityForm.get('city')?.value.trim());
  //   // check if there is a value for 'city' and whether city is duplicate
  //   if (city && !this.citiesList.includes(city)) {
  //     // check if 'city' is valid by checking weather api
  //     this.weatherService.isCityValidUsingObservable(city).subscribe({
  //       next: (isValid: boolean) => {
  //           if (isValid) {
  //             this.citiesList.push(city);
  //           } else {
  //             alert('City ' + '"' + city + '" does not exist.');
  //           }
  //       },
  //       error: (err: string) => {
  //         console.error('Error fetching weather data', err);
  //       },
  //       complete: () => {
  //         this.subscription.unsubscribe();
  //       }
  //     })
  //   } else {
  //     alert('City ' + '"' + city + '" is already in the list.');
  //   }
  //   this.addCityForm.reset();
  // }

  
  // Method 2 - Promise
  addCity() {
    const city = toTitleCase(this.addCityForm.get('city')?.value.trim());
    // check if there is a value for 'city' and whether city is duplicate
    if (city && !this.citiesList.includes(city)) {
      // check if 'city' is valid by checking weather api
      this.weatherService.isCityValidUsingPromise(city)
        .then((isValid: boolean) => {
          if(isValid) {
            this.citiesList.push(city);
          } else {
            alert('City ' + '"' + city + '" does not exist.');
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.error('Error fetching weather data', err.message);
        })
    } else {
      alert('City ' + '"' + city + '" is already in the list.');
    }
    this.addCityForm.reset();
  }

  viewWeatherDetails(city: string) {
    this.router.navigate(['/weather', city]);
  }
}


// Helper method
function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
