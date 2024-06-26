import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task-list/task.service';

@Component({
	selector: 'app-add-task',
	templateUrl: './add-task.component.html',
	styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
	taskForm !: FormGroup;
	dueDateInPast !: boolean;

	constructor(
		private formBuilder: FormBuilder, 
		private taskService: TaskService) { }

	ngOnInit(): void {
		this.taskForm = this.formBuilder.group({
			description: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(5)]),
			priority: this.formBuilder.control<string>('Low'),
			dueDate: this.formBuilder.control<string>('', Validators.required)
		});
	}

	addTask(): void {
		if (this.taskForm.valid && !this.dueDateInPast) {
			const { description, priority, dueDate } = this.taskForm.value;
			this.taskService.addTask({ 
				id: Date.now(), 
				description, 
				priority, 
				dueDate, 
				completed: false });
			this.taskForm.reset();
		}
	}

	checkDueDate(): void {
		const dueDate = new Date(this.taskForm.value.dueDate);
		const currentDate = new Date();
		this.dueDateInPast = dueDate < currentDate;
	}
}
