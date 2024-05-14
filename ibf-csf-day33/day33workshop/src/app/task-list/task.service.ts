import { Injectable } from '@angular/core';
import { Task } from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [
		new Task(1715258810817, "Learn Spring Boot", "Medium", new Date(), false, false)
	];

    constructor() { }

    getTasks(): Task[] {
        return this.tasks;
    }

    addTask(task: Task): void {
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasksToLocalStorage();
    }

    markAsCompleted(id: number): void {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            this.saveTasksToLocalStorage();
        }
    }

    updateTask(updatedTask: Task): void {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.saveTasksToLocalStorage();
        }
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasksFromLocalStorage(): void {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
}
