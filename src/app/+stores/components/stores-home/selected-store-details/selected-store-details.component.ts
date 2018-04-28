import { Component, OnInit, Input } from '@angular/core';

import { Store } from '../../../store';

@Component({
    selector: 'app-selected-store-details',
    templateUrl: './selected-store-details.component.html',
    styleUrls: ['./selected-store-details.component.scss']
})
export class SelectedStoreDetailsComponent implements OnInit {
    @Input() store: Store;

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
