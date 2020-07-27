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
        { headerName: 'First Name', field: 'first_name', editable: true },
        { headerName: 'Last Name', field: 'last_name', editable: true },
        { headerName: 'Address', field: 'address', editable: true },
        { headerName: 'Department', field: 'department', editable: true },
    ];
    readonly defaultColDef = {
      flex: 1,
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
        buttons: ['reset']
      },
    };

    constructor(private employeeService: EmployeeService) {}

    onGridReady = async (params) => {
      params.api.sizeColumnsToFit();
      params.api.setRowData(await this.employeeService.loadEmployees());
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
          params.api.resetRowHeights();
        });
      });
    }

    ngOnInit(): void {}

    onCellValueChanged(params: any) {
      console.log(`CELL VALUE ${JSON.stringify(params.data)}`);
    }
}
