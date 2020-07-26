import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
    selector: 'app-employee-listing',
    templateUrl: './employee-listing.component.html',
    styleUrls: ['./employee-listing.component.scss'],
})
export class EmployeeListingComponent implements OnInit {
    title = 'EmployeeListing';
    readonly columnDefs = [
        { headerName: 'ID', field: 'id', maxWidth: 100 },
        { headerName: 'First Name', field: 'first_name' },
        { headerName: 'Last Name', field: 'last_name'},
        { headerName: 'Address', field: 'address', cellStyle: { 'word-wrap': 'normal' }},
        { headerName: 'Department', field: 'department', cellStyle: { 'word-wrap': 'normal' }},
    ];
    readonly defaultColDef = {
      flex: 1,
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      sortable: true,
      resizable: true
    };

    constructor(private employeeService: EmployeeService) {}

    onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        params.api.setRowData(this.employeeService.loadEmployees());
        window.addEventListener('resize', () => {
            setTimeout(() => {
                params.api.sizeColumnsToFit();
                params.api.resetRowHeights();
            });
        });
    }

    ngOnInit(): void {}
}
