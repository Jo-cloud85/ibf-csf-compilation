import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
      file: this.fb.control<string>('', Validators.required),
      fileSource: this.fb.control<string>('', [Validators.required]),
    })
  }

  onFileChange(event: any): void {
    const input = event.target.files;
    if (input.length > 0) {
      const file = input[0];
      this.empForm.patchValue({ fileSource: file });
    }
  }

  submit(): void {
    if (this.empForm.valid) {
      const formData = new FormData();
      formData.set("firstName", this.empForm.get('firstName')?.value);
      formData.set("lastName", this.empForm.get('lastName')?.value);
      formData.set("email", this.empForm.get('email')?.value);
      formData.set("file", this.empForm.get('fileSource')?.value);

      this.sub$ = this.empSvc.addNewEmployeeToS3(formData)
      .subscribe({
        next: (result: any) => {
          // console.log(result);
          this.empForm.reset();
          this.router.navigate(["/"]);
        },
        error: (error: HttpErrorResponse) => {console.log("Error: " + error)},
        complete: () => {console.log("Form submitted!")},
      })
    }
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }
}
