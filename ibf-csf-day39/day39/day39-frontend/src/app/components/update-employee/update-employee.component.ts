import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  empForm !: FormGroup;
  filePreview: string | ArrayBuffer | null = null;
  existingFileUrl: string | null = null;
  employeeId !: number;

  sub$ !: Subscription;

  private readonly fb = inject(FormBuilder);
  private readonly empSvc = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.empForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      file: this.fb.control<string>('', Validators.required),
      fileSource: this.fb.control<string>('', [Validators.required])
    });

    this.employeeId = +this.activatedRoute.snapshot.params['emp_id'];

    this.empSvc.getEmployeeById(this.employeeId)
    .subscribe(employee => {
      this.empForm.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email
      });
      this.filePreview = employee.profileUrl;
      this.existingFileUrl = employee.profileUrl;  // Use the existing URL
    });
  }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.empForm.patchValue({ fileSource: file});
  //   }
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.empForm.patchValue({ fileSource: file});
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /*
  In TypeScript (and by extension Angular), the exclamation mark (!) after a variable or property name is known as the 
  non-null assertion operator. It tells the TypeScript compiler that you are confident that the variable or property will 
  not be null or undefined at that point in the code, effectively overriding TypeScript's strict null checks.
  */

  submit(): void {
    if (this.empForm.valid) {
      const formData = new FormData();

      formData.set("prevFileUrl", this.existingFileUrl!);

      formData.set("firstName", this.empForm.get('firstName')?.value);
      formData.set("lastName", this.empForm.get('lastName')?.value);
      formData.set("email", this.empForm.get('email')?.value);
      formData.set("file", this.empForm.get('fileSource')?.value);

      this.sub$ = this.empSvc.updateEmployee(this.employeeId, formData)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error: " + error);
        },
        complete: () => {
          console.log("Form submitted!");
        }
      });
    } else {
      return;
    } 
  }
}
