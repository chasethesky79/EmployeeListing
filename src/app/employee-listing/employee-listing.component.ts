import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../service/employee.service";

@Component({
    selector: 'app-employee-listing',
    templateUrl: './employee-listing.component.html',
    styleUrls: ['./employee-listing.component.scss'],
})
export class EmployeeListingComponent implements OnInit {
    title = 'EmployeeListing';
    columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'First Name', field: 'first_name' },
        { headerName: 'Last Name', field: 'last_name' },
        { headerName: 'Address', field: 'address' },
        { headerName: 'Department', field: 'department' },
    ];

    constructor(private employeeService: EmployeeService) {}

    onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        params.api.resetRowHeights();
        params.api.setRowData(this.employeeService.loadEmployees());
        window.addEventListener('resize', () => {
            setTimeout(() => {
                params.api.sizeColumnsToFit();
            });
        });
    };

    ngOnInit(): void {}
}
