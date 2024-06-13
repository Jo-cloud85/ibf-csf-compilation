import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable({providedIn:'root'})
export class EmployeeService {

    private readonly http = inject(HttpClient);

    baseURL = "/api"

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.baseURL}/employees`)
    }

    getEmployeeById(emp_id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseURL}/employee/${emp_id}`)
    }

    addNewEmployeeToS3(formData: FormData) : Observable<any> {
        return this.http.post(`${this.baseURL}/add-employeeS3`, formData);
    }

    updateEmployee(id: number, formData: FormData): Observable<any> {
        return this.http.put(`${this.baseURL}/update/${id}`, formData);
    }

    deleteEmployeeById(id: number): Observable<any> {
        return this.http.delete(`${this.baseURL}/delete/${id}`);
    }
}