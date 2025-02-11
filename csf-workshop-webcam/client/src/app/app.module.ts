import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CameraService } from './services/camera.service';

import { CameraComponent } from './components/camera.component';
import { UploadComponent } from './components/upload.component';

import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebcamModule,
  ],
  providers: [ CameraService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
