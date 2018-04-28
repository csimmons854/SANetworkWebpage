import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgmMap } from '@agm/core';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee';

@Component({
    selector: 'app-employees-home',
    templateUrl: './employees-home.component.html',
    styleUrls: ['./employees-home.component.scss']
})
export class EmployeesHomeComponent implements OnInit {
    employeeList: Employee[] = [];

    selectedNdx = -1;
    selected: Employee;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employees: EmployeeService
    ) {}

    ngOnInit() {
        this.employees.getEmployees().subscribe(results => {
            this.setEmployeeList(results);
        });
    }

    setEmployeeList(employees: Employee[]) {
        this.employeeList = employees;
    }

    employeeSelected(ndx) {
        this.selectedNdx = ndx;
        this.selected = this.employeeList[this.selectedNdx];
    }

    createEmployee() {
        this.router.navigate([`create`], { relativeTo: this.route });
    }
}
