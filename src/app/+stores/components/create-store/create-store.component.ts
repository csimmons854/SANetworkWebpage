import { Component, OnInit } from '@angular/core';
import { StoreFormComponent } from '../store-form/store-form.component';
import { MatSnackBar } from '@angular/material';

import { StoreService } from '../../services/store.service';
import { NewStore, Store } from '../../store';
import { Employee } from '../../../+employees/employee';

@Component({
    selector: 'app-create-store',
    templateUrl: './create-store.component.html',
    styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {
    store: NewStore;
    pageTitle = 'Create Store';

    constructor(private stores: StoreService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        var emptyEmployees: string[];
        emptyEmployees = [];

        this.store = {
            name: '',
            address: '',
            phone: '(800) 555-5555',
            hours: {
                sun: { open: 10, close: 21 },
                mon: { open: 10, close: 21 },
                tue: { open: 10, close: 21 },
                wed: { open: 10, close: 21 },
                thu: { open: 10, close: 21 },
                fri: { open: 10, close: 21 },
                sat: { open: 10, close: 21 }
            },
            location: {
                lat: 100,
                lng: 100
            },
            employees: emptyEmployees
        };
    }

    submit($event) {
        let store: NewStore = $event;

        store.phone =
            '(' +
            $event.phone_area +
            ') ' +
            $event.phone_exchange +
            '-' +
            $event.phone_subscriber;

        store.hours = {
            sun: { open: 9, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        };

        store.location = {
            lat: 31.8809,
            lng: -97.38254
        };

        store.employees = $event.employees;

        this.stores.createStore(store).subscribe(response => {
            if (response.success) {
                this.snackBar.open('Store Created', '', {
                    duration: 2000
                });
            }
        });
    }
}
