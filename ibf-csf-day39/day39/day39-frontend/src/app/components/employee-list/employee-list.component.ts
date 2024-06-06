import { Component, OnInit, inject } from '@angular/core';
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
export class EmployeeListComponent implements OnInit {

  private readonly empSvc = inject(EmployeeService);
  private readonly router = inject(Router);

  sub$ !: Subscription;

  employees: Employee[] = [];

  ngOnInit(): void {

  }

  deleteEmployee(id: string) {
    console.log("ID of deleted employee: " + id);
  }

  showEmployeeDetails(id: string) {
    this.sub$ = this.empSvc.getEmployeeById(id).subscribe({
      next: (result) => {console.log(result)},
      error: (error: HttpErrorResponse) => console.log("Error: " + error),
      complete: () => console.log("Showed employee details")
    })
    this.router.navigate(['/employee', id])
  }
}
