import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../employee';

import { Store } from '../../../../+stores/store';
import { StoreService } from '../../../../+stores/services/store.service';
import { EmployeeService } from 'app/+employees/services/employee.service';

@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
    @Input() employees: Employee[];
    @Input() selectedNdx: number;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() editEmployee: EventEmitter<any> = new EventEmitter<any>();

    employeesStores: Store[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stores: StoreService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit() {
        this.getEmployeesStores();
    }

    getEmployeesStores() {
        this.refreshEmployees();

        let gottenStore;
        this.employeesStores = [];
        for (var i = 0; i < this.employees.length; i++) {
            try {
                this.stores
                    .getStoreForEmployee(this.employees[i].id)
                    .subscribe(
                        gottenStore => (this.employeesStores[i] = gottenStore)
                    );
            } catch (Error) {
                console.log(
                    'Error getting store for: ' + this.employees[i].firstname
                );
                this.employeesStores[i] = null;
            }
        }
    }

    refreshEmployees() {
        let gottenEmployees;
        this.employeeService
            .getEmployees()
            .subscribe(gottenEmployees => (this.employees = gottenEmployees));
    }

    employeeSelected(event) {
        this.selectionChange.emit(event.option.value);
    }

    editEmployeeClick(event) {
        let id = this.employees[event].id;
        this.router.navigate([`./${id}/edit`], { relativeTo: this.route });
    }

    deleteEmployeeClick(event) {
        let id = this.employees[event].id;
        this.employeeService.deleteEmployee(id);
        this.router.navigate([`.`], { relativeTo: this.route });
    }
}
