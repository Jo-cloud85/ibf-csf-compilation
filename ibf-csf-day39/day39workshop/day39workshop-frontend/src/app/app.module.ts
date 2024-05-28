import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './views/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CharacterListComponent } from './views/character-list.component';
import { CharacterDetailsComponent } from './views/character-details.component';
import { PostCommentComponent } from './views/post-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    PostCommentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
