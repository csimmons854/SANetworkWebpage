import { Component, Input } from '@angular/core';
import { Employee } from '../../../employee';

@Component({
    selector: 'app-employee-appointments',
    templateUrl: './employee-appointments.component.html',
    styleUrls: ['./employee-appointments.component.scss']
})
export class EmployeeAppointmentsComponent {
    @Input('employee') employee: Employee;
}
