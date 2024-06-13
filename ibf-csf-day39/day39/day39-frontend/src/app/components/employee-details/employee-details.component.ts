import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  
  private readonly svc = inject(EmployeeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  empList$!: Subscription;
  employee!: Employee;

  ngOnInit(): void {
    const empId = +this.activatedRoute.snapshot.params['emp_id'];
    this.empList$ = this.svc.getEmployeeById(empId)
      .subscribe(response => {
        this.employee = response;
        console.log('>>> employee detail:', this.employee);
      });
  }

  ngOnDestroy(): void {
    this.empList$.unsubscribe();
  }
}
