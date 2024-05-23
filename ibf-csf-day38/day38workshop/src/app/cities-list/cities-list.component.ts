import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../weather.service';
import { CitiesStorage } from '../cities.storage.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent implements OnInit {
  addCityForm !: FormGroup;
  city !: string;
  // citiesList: string[] = ['Singapore', 'Kuala Lumpur', 'Tokyo', 'Bangkok', 'Hong Kong', 'Beijing'];
  citiesList: string[] = [];
  private subscription !: Subscription;

  agree = false;
  cities$!: Promise<{name: string}[]>
  
  constructor(
    private formbuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router,
    private citiesStorage: CitiesStorage) {}

  ngOnInit(): void {
    this.addCityForm = this.formbuilder.group({
      city: this.formbuilder.control<string>('', [Validators.required])
    })

    this.cities$ = this.citiesStorage.getAllCities();
    this.cities$.then(cities => {
      this.citiesList = cities.map(city => city.name);
    });
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
            this.citiesList.push(city)
          } else {
            alert('City ' + '"' + city + '" does not exist.');
          }
        })
        .then (() => {
          this.citiesStorage.addCity(city)
        })
        .then (() => {
          console.log('City added to IndexedDB')
        })
        .catch((error: HttpErrorResponse) => {
          console.log('Error adding city to IndexedDB: ', error.message);
        })
        .catch((err: HttpErrorResponse) => {
          console.error('Error fetching weather data', err.message);
        })
    } else {
      alert('City ' + '"' + city + '" is already in the list.');
    }
    this.addCityForm.reset();
  }

  deleteCity(cityToDel: string) {
    this.citiesList = this.citiesList.filter((city: string)=> {city !== cityToDel})
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