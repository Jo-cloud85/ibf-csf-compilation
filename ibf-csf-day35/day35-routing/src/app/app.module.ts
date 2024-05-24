import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main.component';
import { CatComponent } from './views/cat.component';
import { DogComponent } from './views/dog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
