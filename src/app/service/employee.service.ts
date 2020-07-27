import { Injectable } from '@angular/core';
import * as data from '../data/employees.json';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor() {}

    async loadEmployees() {
       return await this.saveEmployees((data as any).default);
    }

    async saveEmployees(employees: Employee[]): Promise<Employee[]> {
      return new Promise( (resolve, reject) => {
        setTimeout( () => {
          localStorage.people = JSON.stringify(employees);
          resolve(employees);
        }, 1000);
      });
    }
}
