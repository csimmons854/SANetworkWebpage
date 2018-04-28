import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { Store } from '../../store';

@Component({
    selector: 'app-store-detail',
    templateUrl: './store-detail.component.html',
    styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
    id: string;
    store: Store;

    @Input() empFirst: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private stores: StoreService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.updateStore();
        });

        if (this.empFirst) {
        }
    }

    updateStore() {
        this.stores.getStore(this.id).subscribe(
            store => {
                this.store = store;
            },
            error => {
                this.router.navigate(['../stores']);
            }
        );
    }
}
