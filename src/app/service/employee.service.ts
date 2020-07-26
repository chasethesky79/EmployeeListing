import { Injectable } from '@angular/core';
import * as data from '../data/employees.json';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor() {}

    loadEmployees(): Employee[] {
        return (data as any).default;
    }
}
