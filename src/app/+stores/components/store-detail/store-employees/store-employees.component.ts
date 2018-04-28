import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '../../../store';
import { StoreService } from '../../../services/store.service';
import { EmployeeService } from '../../../../+employees/services/employee.service';
import { Employee } from '../../../../+employees/employee';

@Component({
    selector: 'app-store-employees',
    templateUrl: './store-employees.component.html',
    styleUrls: ['./store-employees.component.scss']
})
export class StoreEmployeesComponent implements OnInit {
    @Input('store') store: Store;
    employeeIDs: string[] = [];
    employeeList: Employee[] = [];
    selectedNdx = -1;
    selected: Employee;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employees: EmployeeService,
        private stores: StoreService
    ) {}

    ngOnInit() {
        this.setEmployeeList(this.store.employees);
    }

    setEmployeeList(employeeIDList: string[]) {
        for (var i = 0; i < employeeIDList.length; i++) {
            this.employees
                .getEmployee(employeeIDList[i])
                .subscribe(employee => {
                    this.employeeList[i] = employee;
                });
        }
    }

    employeeSelected(ndx) {
        this.selectedNdx = ndx;
        this.selected = this.employeeList[this.selectedNdx];
    }

    addEmployee() {
        this.router.navigate(['./add'], {
            relativeTo: this.route
        });
    }
}
