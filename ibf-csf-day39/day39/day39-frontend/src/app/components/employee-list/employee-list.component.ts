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
        // the id is coming in as emp_id so your Angular model must match or you can manually map
        console.log("Results: " + JSON.stringify(result))
        this.employees = result;
      },
      error: (error: HttpErrorResponse) => console.log("Error: " + error),
      complete: () => console.log("Existing list of employees")
    })
  }

  showEmployeeDetails(id: number) {
    this.sub$ = this.empSvc.getEmployeeById(id).subscribe({
      next: (result) => {console.log("Showing employee details: " + result)},
      error: (error: HttpErrorResponse) => console.log("Error: " + error),
      complete: () => console.log("Showed employee details")
    })
    this.router.navigate(['/employee', id])
  }

  updateEmployee(id: number) {
    this.router.navigate(['/employee', id, 'update']);
  }

  deleteEmployee(id: number): void {
    this.sub$ = this.empSvc.deleteEmployeeById(id).subscribe({
      next: () => {
        // Update the local state to reflect the deletion
        this.employees = this.employees.filter(employee => employee.emp_id !== id);
        console.log(`Employee: ${id} deleted successfully`);
      },
      error: (error) => console.log("Error: " + error),
      complete: () => console.log("Deletion completed")
    });
  }


  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }
}
