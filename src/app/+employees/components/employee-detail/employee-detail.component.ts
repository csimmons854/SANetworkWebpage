import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee';

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
    id: string;
    Employee: Employee;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private Employees: EmployeeService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.updateEmployee();
        });
    }

    updateEmployee() {
        this.Employees.getEmployee(this.id).subscribe(
            Employee => {
                this.Employee = Employee;
            },
            error => {
                this.router.navigate(['../employees']);
            }
        );
    }
}
