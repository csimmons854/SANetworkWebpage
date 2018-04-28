import { Component, Input } from '@angular/core';
import { Employee } from '../../../employee';

@Component({
    selector: 'app-employee-info',
    templateUrl: './employee-info.component.html',
    styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent {
    @Input('employee') employee: Employee;
}
