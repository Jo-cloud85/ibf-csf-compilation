import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task-list/task.service';
import { v4 as uuidv4 } from 'uuid';
import { checkDueDate } from '../custom-validator';

@Component({
	selector: 'app-add-task',
	templateUrl: './add-task.component.html',
	styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
	taskForm!: FormGroup;
	dueDateInPast: boolean = false;
	priority: string[] = ['Low', 'Medium', 'High']
	datepicker!: Date;
	taskdatepicker!: Date;

	constructor(
		private formBuilder: FormBuilder, 
		private taskService: TaskService) { }

	ngOnInit(): void {
		this.taskForm = this.formBuilder.group({
			description: ['', [Validators.required, Validators.minLength(5)]],
			priority: ['Low'],
			dueDate: ['', [Validators.required, checkDueDate]]
		});
	}

	addTask(): void {
		if (this.taskForm.valid) {
			const { description, priority, dueDate } = this.taskForm.value;
			const uuid: string = uuidv4().slice(0,8);
			this.taskService.addTask({ 
				id: uuid, 
				description, 
				priority, 
				dueDate, 
				completed: false });
			this.taskForm.reset();
		}
	}
}
