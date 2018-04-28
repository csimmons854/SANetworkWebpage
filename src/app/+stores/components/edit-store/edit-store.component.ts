import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { Store } from '../../store';

@Component({
    selector: 'app-edit-store',
    templateUrl: './edit-store.component.html',
    styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {
    storeToEdit: Store;
    storeID: string;
    pageTitle = 'Edit Store';

    constructor(
        private stores: StoreService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.storeID = params.id;
        });

        this.getStoreToEdit(this.storeID);

        if (this.storeToEdit == null) {
            this.router.navigate(['../stores/', this.storeID]);
        }
    }

    getStoreToEdit(storeToGetID): void {
        try {
            this.stores
                .getStore(storeToGetID)
                .subscribe(gottenStore => (this.storeToEdit = gottenStore));
        } catch (Error) {
            this.storeToEdit = null;
        }
    }

    submit($event) {
        var updatedStore: Store = $event;
        updatedStore.id = this.storeID;

        updatedStore.phone =
            '(' +
            $event.phone_area +
            ') ' +
            $event.phone_exchange +
            '-' +
            $event.phone_subscriber;

        updatedStore.location = {
            lat: $event.lat,
            lng: $event.lng
        };

        updatedStore.hours = {
            sun: { open: 9, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        };

        this.stores.updateStore(updatedStore).subscribe(response => {
            if (response.success) {
                this.router.navigate(['../stores/', this.storeID]);

                this.snackBar.open('Store Updated', '', {
                    duration: 2000
                });
            }
        });
    }
}
