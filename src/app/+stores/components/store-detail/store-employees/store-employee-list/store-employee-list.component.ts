import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../../../services/store.service';

import { Employee } from '../../../../../+employees/employee';
import { EmployeesListComponent } from 'app/+employees/components/employees-home/employees-list/employees-list.component';
import { EmployeeService } from 'app/+employees/services/employee.service';

@Component({
    selector: 'app-store-employee-list',
    templateUrl: './store-employee-list.component.html',
    styleUrls: ['./store-employee-list.component.scss']
})
export class StoreEmployeeListComponent implements OnInit {
    @Input() employeeList: Employee[];
    @Input() selectedNdx: number;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() editEmployee: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employees: EmployeeService,
        private stores: StoreService
    ) {}

    ngOnInit() {}

    employeeSelected(event) {
        this.selectionChange.emit(event.option.value);
    }

    editEmployeeClick(employeeIndex) {
        let id = this.employeeList[employeeIndex].id;

        this.router.navigate([`../../employees/${id}/edit`], {
            relativeTo: this.route
        });
    }

    deleteEmployeeClick(employeeIndex) {
        console.log('Delete Button Clicked: ' + employeeIndex);

        let id = this.employeeList[employeeIndex].id;
        // let storeID = this.employees.getStoreFor(id);
        // this.stores.removeEmployeeFromStore(id, storeID);
        this.employees.deleteEmployee(id);

        this.router.navigate([`..`], { relativeTo: this.route });
    }
}
