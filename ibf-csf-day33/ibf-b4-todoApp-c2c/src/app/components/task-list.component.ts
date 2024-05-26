import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';

import { Todo } from '../models/todo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() todos: Todo[] = [];
  @Output() editTodo = new Subject<Todo>();

  constructor() { }

  edit(todo: Todo){
    this.editTodo.next(todo);
  }

  toggleComplete(todo: Todo){
    
  }

}
