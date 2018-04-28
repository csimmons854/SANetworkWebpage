import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee';
import { Store } from '../../../+stores/store';
import { StoreService } from '../../../+stores/services/store.service';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
    pageTitle = 'Create Employee';
    storeList: Store[];
    currentStore: Store;

    constructor(
        private employees: EmployeeService,
        private stores: StoreService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.getStoreList();
        if (this.storeList == null) {
            this.router.navigate(['../employees']);
        }
    }

    getStoreList(): void {
        try {
            this.stores
                .getStores()
                .subscribe(gottenStores => (this.storeList = gottenStores));
        } catch (Error) {
            console.log('Could not find list of stores');
            this.storeList = null;
        }
    }

    addEmployeeClick($storeSelectedForTransfer): void {
        let id = $storeSelectedForTransfer.id;
        this.router.navigate([`../../stores/${id}/add`], {
            relativeTo: this.route
        });
    }
}
