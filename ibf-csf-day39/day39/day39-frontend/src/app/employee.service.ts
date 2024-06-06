import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable({providedIn:'root'})
export class EmployeeService {

    private readonly http = inject(HttpClient);

    baseURL = "http://localhost:3000/api"

    getAllEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.baseURL}/employees`)
    }

    getEmployeeById(emp_id: String): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseURL}/${emp_id}`)
    }

    addNewEmployee(employee: Employee) : Observable<any> {
        return this.http.post(`${this.baseURL}/add-employee`, employee);
    }

    addNewEmployeeToS3(employee: Employee) : Observable<any> {
        return this.http.post(`${this.baseURL}/add-employeeS3`, employee);
    }

    updateEmployeeById(id: String, employee: Employee): Observable<any> {
        return this.http.put(`${this.baseURL}/update/${id}`, employee);
    }

    deleteEmployeeById(id: String): Observable<any> {
        return this.http.delete(`${this.baseURL}/delete/${id}`);
    }
}