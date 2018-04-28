import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee';
import { Store } from '../../../+stores/store';
import { StoreService } from '../../../+stores/services/store.service';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
    employeeToEdit: Employee;
    employeeID: string;
    pageTitle = 'Edit Employee';
    otherStores: Store[];
    currentStore: Store;

    constructor(
        private employees: EmployeeService,
        private stores: StoreService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.employeeID = params.id;
        });

        this.getEmployeeToEdit(this.employeeID);
        if (this.employeeToEdit == null) {
            this.router.navigate(['../employees/', this.employeeID]);
        }

        this.getCurrentStore();
        if (this.currentStore == null) {
            this.router.navigate(['../employees/', this.employeeID]);
        }

        this.getOtherStores();
        if (this.otherStores == null) {
            this.router.navigate(['../employees/', this.employeeID]);
        }
    }

    getCurrentStore(): void {
        try {
            this.stores
                .getStoreForEmployee(this.employeeID)
                .subscribe(gottenStore => (this.currentStore = gottenStore));
        } catch (Error) {
            console.log('Could not find current store');
            this.currentStore = null;
        }
    }

    getOtherStores(): void {
        let allStores: Store[];
        try {
            this.stores
                .getStores()
                .subscribe(gottenStores => (allStores = gottenStores));
        } catch (Error) {
            console.log('Could not find list of stores');
            allStores = null;
        }

        this.otherStores = [];
        for (let store of allStores) {
            if (store.id != this.currentStore.id) {
                this.otherStores.push(store);
            }
        }
    }

    getEmployeeToEdit(employeeToGetID): void {
        try {
            this.employees
                .getEmployee(employeeToGetID)
                .subscribe(
                    gottenEmployee => (this.employeeToEdit = gottenEmployee)
                );
        } catch (Error) {
            console.log('Could not find the employee to edit');
            this.employeeToEdit = null;
        }
    }

    transferEmployeeClick($storeSelectedForTransfer): void {
        this.stores.transferEmployee(
            this.employeeID,
            $storeSelectedForTransfer.id
        );
        this.router.navigate(['..', this.route]);
    }

    submit($event) {
        var updatedEmployee: Employee = $event;
        updatedEmployee.id = this.employeeID;

        this.employees.updateEmployee(updatedEmployee).subscribe(response => {
            if (response.success) {
                this.router.navigate(['..', this.route]);

                this.snackBar.open('Employee Updated', '', {
                    duration: 2000
                });
            }
        });
    }
}
