import { CharacterListComponent } from './views/character-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './views/character-details.component';
import { PostCommentComponent } from './views/post-comment.component';
import { SearchComponent } from './views/search.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'characters', component: CharacterListComponent},
  {path: 'character/:characterId', component: CharacterDetailsComponent},
  // I added characterName because I want to pass the characterName as a parameter from the details component
  {path: 'character/:characterId/:characterName/post-comment', component: PostCommentComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
