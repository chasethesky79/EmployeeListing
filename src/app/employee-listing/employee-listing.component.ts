import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import {ColumnDefinition} from '../models/column-definition';

@Component({
    selector: 'app-employee-listing',
    templateUrl: './employee-listing.component.html',
    styleUrls: ['./employee-listing.component.scss'],
})
export class EmployeeListingComponent implements OnInit {
    readonly colDefID = {
      headerName: 'ID',
      field: 'id',
      maxWidth: 100
    };
    readonly colDefFName = {
      headerName: 'First Name',
      field: 'first_name',
      editable: true
    };
    readonly colDefLName = {
      headerName: 'Last Name',
      field: 'last_name',
      editable: true
    };
    readonly colDefAddress = {
      headerName: 'Address',
      field: 'address',
      editable: true
    };
    readonly colDefDepartment = {
      headerName: 'Department',
      field: 'department',
      editable: true
    };
    columnDefs: ColumnDefinition[] = [this.colDefID, this.colDefFName, this.colDefLName, this.colDefAddress, this.colDefDepartment];

    readonly defaultColDef = {
        flex: 1,
        cellClass: 'cell-wrap-text',
        autoHeight: true,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
            buttons: ['reset'],
        },
    };
    private gridApi;

    constructor(private employeeService: EmployeeService) {}

    onBtApply = () => {
      this.columnDefs = [];
      if (this.getBooleanValue('#first_name')) {
        this.columnDefs.push(this.colDefFName);
      }
      if (this.getBooleanValue('#last_name')) {
        this.columnDefs.push(this.colDefLName);
      }
      if (this.getBooleanValue('#address')) {
        this.columnDefs.push(this.colDefAddress);
      }
      if (this.getBooleanValue('#department')) {
        this.columnDefs.push(this.colDefDepartment);
      }
      this.gridApi.sizeColumnsToFit();
    }

    onGridReady = async (params: any) => {
        this.gridApi = params.api;
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

    onCellValueChanged = async (params: any) => {
        params.api.setRowData(await this.employeeService.saveEmployee(params.data));
    }

    private getBooleanValue = (cssSelector) => {
      return document.querySelector(cssSelector).checked === true;
    }
}
