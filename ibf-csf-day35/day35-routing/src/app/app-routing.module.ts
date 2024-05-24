import { MainComponent } from './views/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogComponent } from './views/dog.component';

const appRoutes: Routes = [
  {path:'', component: MainComponent},
  {path: 'dog', component: DogComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
