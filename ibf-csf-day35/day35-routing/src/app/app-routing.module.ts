import { MainComponent } from './views/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogComponent } from './views/dog.component';
import { CatComponent } from './views/cat.component';
import { PolarBearComponent } from './views/polar-bear.component';
import { enterPolarBear, leavePolarBear } from './guards';

const appRoutes: Routes = [
  {path:'', component: MainComponent},
  {path: 'cat', component: CatComponent},
  {path: 'dog/:breed', component: DogComponent},
  {path: 'polarbear', component: PolarBearComponent, canActivate: [enterPolarBear], canDeactivate: [leavePolarBear]},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
