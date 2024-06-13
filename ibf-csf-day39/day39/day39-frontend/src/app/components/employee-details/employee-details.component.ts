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
  empList$!: Subscription;
  empList!: Employee[];

  ngOnInit(): void {
    this.empList$ = this.svc.getAllEmployees()
      .subscribe(response => {
        this.empList = response;
        console.log('>>> employees list:', this.empList);
      });
  }

  ngOnDestroy(): void {
    this.empList$.unsubscribe();
  }
}
