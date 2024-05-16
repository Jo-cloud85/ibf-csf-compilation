import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from '../task-list/task.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
	tasks: Task[] = [];
	dueDateInPast: boolean = false;
	priority: string[] = ['Low', 'Medium', 'High']

	constructor(private taskService: TaskService) { }

	ngOnInit(): void {
		this.loadTasks();
	}

	loadTasks(): void {
		this.tasks = this.taskService.getTasks();
	}

	toggleCompleted(task: Task): void {
		task.completed = !task.completed;
		this.taskService.updateTask(task);
	}

	deleteTask(id: string): void {
		this.taskService.deleteTask(id);
		this.loadTasks();
	}

	editTask(task: Task): void {
		task.editing = true;
		task.editingPriority = true;
    	task.editingDueDate = true;
	}

	saveTask(task: Task): void {
		task.editing = false;
		task.editingPriority = false;
		task.editingDueDate = false;
		this.taskService.updateTask(task);
		this.loadTasks();
	}
}
