import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  
  empForm !: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly empSvc = inject(EmployeeService);
  private readonly router = inject(Router);

  sub$!: Subscription;

  ngOnInit(): void {
    this.empForm = this.fb.group({
      firstName: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      file: this.fb.control<string>('', Validators.required)
    })
  }

  submit(): void {
    this.sub$ = this.empSvc.addNewEmployeeToS3(this.empForm.value)
    .subscribe({
      next: (result) => {console.log(result)},
      error: (error) => {console.log("Error: " + error)},
      complete: () => {console.log("Form submitted!")},
    })
    this.router.navigate(["/employees"]);
    this.empForm.reset();
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }
}
