import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../../../services/store.service';
import { Store } from '../../../../store';

import { EmployeeService } from '../../../../../+employees/services/employee.service';
import { NewEmployee, Employee } from '../../../../../+employees/employee';
import { EmployeesModule } from 'app/+employees/employees.module.tns';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    storeToEdit: Store;
    storeID: string;
    pageTitle: string = 'Add Employee';
    employee: NewEmployee;
    form: FormGroup;

    @Output() submit: EventEmitter<Employee> = new EventEmitter();

    constructor(
        private stores: StoreService,
        private employees: EmployeeService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.employee = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: ''
        };

        this.form = this.fb.group({
            firstname: [this.employee.firstname, Validators.required],
            lastname: [this.employee.lastname, Validators.required],
            username: [this.employee.username, Validators.required],
            password: [this.employee.password, Validators.required],
            email: [this.employee.email, Validators.required]
        });

        this.route.params.subscribe(params => {
            this.storeID = params.id;
        });

        this.getStoreToAddTo(this.storeID);
        if (this.storeToEdit == null) {
            this.router.navigate(['..', this.storeID]);
        }
    }

    getStoreToAddTo(storeToGetID): void {
        try {
            this.stores
                .getStore(storeToGetID)
                .subscribe(gottenStore => (this.storeToEdit = gottenStore));
        } catch (Error) {
            this.storeToEdit = null;
        }
    }

    submitted($event: NewEmployee) {
        console.log('submitted');
        this.completeAddition(this.form.value);
    }

    completeAddition($event) {
        // create the employee in db
        this.employee.firstname = $event.firstname;
        this.employee.lastname = $event.lastname;
        this.employee.username = $event.username;
        this.employee.password = $event.password;
        this.employee.email = $event.email;

        let empID: string;
        this.employees
            .createEmployee(this.employee, this.storeID)
            .subscribe(assignedID => {
                empID = assignedID;
            });

        // add the employee's id to store's employee list
        //this.stores.addEmployeeToStore(empID, this.storeID);

        this.router.navigate(['../stores/', this.storeID]);
    }
}
