import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: CitiesListComponent
  },
  { 
    path: 'weather/:city', 
    component: WeatherDetailsComponent 
  },
  { 
    path: 'not-found', 
    component: ErrorPageComponent,
    data: {message: 'City not found!'}
  },
  { 
    path: '**', 
    redirectTo: '/not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
