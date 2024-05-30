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
  { path: 'cached/:q', component: CachedComponent },
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
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* Using { useHash: true } allows us to do deeplinking and links to stay intact in the backend. What
happen is when the backend sees '#', it passes the 'routing' job to Angular. But note that this is only valid 
when you are serving the Angular from the backend i.e. 'same-origin'. If you are doing cross-origin i.e. 
running Angular and Spring Boot separately, then you don't need to use { useHash: true }.

(This for the backend. '/' means point to something outside of your doc.)
http://acme.com/search?q=seal

(This for the frontend. '#' means point to something in your current doc.)
http://acme.com/search#/=seal
*/