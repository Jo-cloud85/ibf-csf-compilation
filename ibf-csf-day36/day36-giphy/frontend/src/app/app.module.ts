import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main.component';
import { CachedComponent } from './views/cached.component';
import { SearchComponent } from './views/search.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'search', component: SearchComponent }, 
  { path: 'cached', component: CachedComponent },
  { path: '**', redirectTo: "/", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CachedComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
