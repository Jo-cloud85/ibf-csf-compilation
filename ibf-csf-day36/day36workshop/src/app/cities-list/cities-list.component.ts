import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent implements OnInit {
  addCityForm !: FormGroup;
  city !: string;
  citiesList: string[] = ['Singapore', 'Kuala Lumpur', 'Tokyo', 'Bangkok', 'Hong Kong', 'Beijing'];
  
  constructor(
    private formbuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router) {}

  ngOnInit(): void {
    this.addCityForm = this.formbuilder.group({
      city: ['', Validators.required]
    })
  }

  /* This mtd should check for 2 things:
     - Whether the city exist -> throw 'city not found' error
     - Whether there is a duplicate -> throw 'you have already added this city' error
  */
  addCity() {
    const city = toTitleCase(this.addCityForm.get('city')?.value.trim());
    if (city && !this.citiesList.includes(city)) {
      this.weatherService.isCityValid(city).subscribe(isValid => {
        if (isValid) {
          this.citiesList.push(city);
        } else {
          alert('City:' + '"' + city + '" does not exist.');
          
        }
      });
    } else {
      alert('City:' + '"' + city + '" is already in the list.');
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
