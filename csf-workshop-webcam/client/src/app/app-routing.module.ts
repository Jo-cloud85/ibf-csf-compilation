import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';

const appsRoute: Routes = [
  { path: '', component: CameraComponent},
  { path: 'upload', component: UploadComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appsRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
