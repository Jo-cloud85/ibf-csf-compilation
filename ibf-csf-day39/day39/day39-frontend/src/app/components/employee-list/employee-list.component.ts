import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Employee } from '../../employee.model';
import { EmployeeService } from '../../employee.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  private readonly empSvc = inject(EmployeeService);
  private readonly router = inject(Router);

  sub$ !: Subscription;

  employees: Employee[] = [];

  ngOnInit(): void {
    this.sub$ = this.empSvc.getAllEmployees().subscribe({
      next: (result: any) => {
        console.log("Results: " + JSON.stringify(result))
        this.employees = result;
      },
      error: (error: HttpErrorResponse) => console.log("Error: " + error),
      complete: () => console.log("Existing list of employees")
    })
  }

  deleteEmployee(id: number) {
    console.log("ID of deleted employee: " + id);
  }

  showEmployeeDetails(id: number) {
    this.sub$ = this.empSvc.getEmployeeById(id.toString()).subscribe({
      next: (result) => {console.log(result)},
      error: (error: HttpErrorResponse) => console.log("Error: " + error),
      complete: () => console.log("Showed employee details")
    })
    this.router.navigate(['/employee', id])
  }

  updateEmployee(id: number) {
    //
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }
}
