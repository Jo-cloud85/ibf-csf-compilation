import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Material imports
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Todo } from '../models/todo';
import { TaskListComponent } from './task-list.component';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    TaskListComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  form!: FormGroup;
  priorities: string[] = ['Low', 'Medium' , 'High']; 
  todos : Todo[] = [];
  currentTodo! : Todo;
  editMode: boolean = false;
  editElemIdx : number = 0;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['', Validators.required]
    })
  }

  addTodo(){
    console.log('Add todo');
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    let taskId = uuidv4();
    console.log(taskId);
    console.log(desc);
    this.currentTodo = new Todo(desc, priority, new Date(), taskId);
    this.todos.push(this.currentTodo);
  }

  updateTodo(){
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    this.todos[this.editElemIdx].task = desc;
    this.todos[this.editElemIdx].priority = priority;
    
  }

  cancelUpdateTodo(){
    this.editMode = false;
    this.form.reset();
  }

  onEditTodo(todo: Todo){
    console.log(todo.taskId);
    this.editElemIdx = this.todos.indexOf(todo);
    console.log(this.editElemIdx);
    console.log(todo.priority);
    this.form.get('task')?.setValue(todo.task);  
    this.form.get('priority')?.setValue(todo.priority);

    this.editMode = true;
  }
}
