import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../../../employee';

@Component({
    selector: 'app-selected-employee-details',
    templateUrl: './selected-employee-details.component.html',
    styleUrls: ['./selected-employee-details.component.scss']
})
export class SelectedEmployeeDetailsComponent implements OnInit {
    @Input() employee: Employee;

    constructor() {}

    ngOnInit() {}

    hoursToString(hours: { open: number; close: number }) {
        let open = this.numberToHours(hours.open);
        let close = this.numberToHours(hours.close);
        return `${open} - ${close}`;
    }

    numberToHours(time: number) {
        let suffix = 'AM';
        if (time > 12) {
            suffix = 'PM';
        }
        let hour = (Math.floor(time) % 12).toString();

        return `${hour}:00 ${suffix}`;
    }
}
