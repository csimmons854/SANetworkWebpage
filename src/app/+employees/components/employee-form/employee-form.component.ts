import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../../employee';
import { forEach } from '@angular/router/src/utils/collection';

import { StoreService } from '../../../+stores/services/store.service';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
    @Input() employee: Employee;
    @Output() submit: EventEmitter<Employee> = new EventEmitter();
    @Input() form: FormGroup;
    @Input() pageTitle: string;

    stores = this.storeService.getStores();

    constructor(private fb: FormBuilder, private storeService: StoreService) {}

    ngOnInit() {
        if (this.employee == null) {
            this.form = this.fb.group({
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                username: ['', Validators.required],
                password: ['', Validators.required],
                email: ['', Validators.required]
            });
        } else {
            this.form = this.fb.group({
                firstname: [this.employee.firstname, Validators.required],
                lastname: [this.employee.lastname, Validators.required],
                username: [this.employee.username, Validators.required],
                password: [this.employee.password, Validators.required],
                email: [this.employee.email, Validators.required]
            });
        }
    }

    submitted() {
        this.submit.emit(this.form.value);
    }

    transferred() {
        this.submit.emit(this.form.value.destStore);
    }
}
