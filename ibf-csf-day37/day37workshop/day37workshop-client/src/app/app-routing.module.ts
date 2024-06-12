import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPostComponent } from './component/upload-post.component';
import { GetPostComponent } from './component/get-post.component';

const routes: Routes = [
  {path: '', component: UploadPostComponent},
  {path: 'post/:postId', component: GetPostComponent},
  {path: '**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
