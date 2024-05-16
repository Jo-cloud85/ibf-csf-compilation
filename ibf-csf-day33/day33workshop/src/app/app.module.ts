import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatLuxonDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
