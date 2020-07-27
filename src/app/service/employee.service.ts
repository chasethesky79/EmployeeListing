import { Injectable } from '@angular/core';
import * as data from '../data/employees.json';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor() {}

    async loadEmployees(): Promise<Employee[]> {
        const employees = await this.fetchFromLocalStorage();
        return employees.length === 0 ? await this.saveInLocalStorage((data as any).default) : employees;
    }

    async saveEmployee(employee: Employee): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const employeesToSave = JSON.parse(localStorage.employees).map((element: Employee) =>
                    element.id === employee.id ? employee : element
                );
                localStorage.employees = JSON.stringify(employeesToSave);
                resolve(employeesToSave);
            }, 1000);
        });
    }

    private async fetchFromLocalStorage(): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = JSON.parse(localStorage.employees || '[]');
                resolve(result);
            }, 1000);
        });
    }

    private async saveInLocalStorage(employees: Employee[]): Promise<Employee[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                localStorage.employees = JSON.stringify(employees);
                resolve(employees);
            }, 1000);
        });
    }
}
