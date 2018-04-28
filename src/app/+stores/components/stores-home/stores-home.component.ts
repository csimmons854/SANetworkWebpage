import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgmMap } from '@agm/core';

import { StoresMapComponent } from './stores-map/stores-map.component';
import { StoreService } from '../../services/store.service';
import { Store } from '../../store';

@Component({
    selector: 'app-stores-home',
    templateUrl: './stores-home.component.html',
    styleUrls: ['./stores-home.component.scss']
})
export class StoresHomeComponent implements OnInit {
    @ViewChild(StoresMapComponent) storesMap;

    storeList: Store[] = [];

    selectedNdx = -1;
    selected: Store;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stores: StoreService
    ) {}

    ngOnInit() {
        this.stores.getStores().subscribe(results => {
            this.setStoreList(results);
        });
    }

    setStoreList(stores: Store[]) {
        this.storesMap.setStores(stores);
        this.storeList = stores;
    }

    storeSelected(ndx) {
        this.selectedNdx = ndx;
        this.selected = this.storeList[this.selectedNdx];
    }

    viewStore(index) {
        let id = this.storeList[index].id;
        this.router.navigate([`./${id}`], { relativeTo: this.route });
    }
}
