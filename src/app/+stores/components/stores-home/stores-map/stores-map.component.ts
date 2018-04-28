import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';

import { Store } from '../../../store';

@Component({
    selector: 'app-stores-map',
    templateUrl: './stores-map.component.html',
    styleUrls: ['./stores-map.component.scss']
})
export class StoresMapComponent implements OnInit {
    @ViewChild(AgmMap) map: AgmMap;

    @Input() stores: Store[] = [];

    // map bounds
    bounds: { east: number; west: number; north: number; south: number };

    constructor() {}

    ngOnInit() {
        if (this.bounds == undefined) {
            this.initMapBounds();
        }
    }

    ngAfterViewInit() {
        this.map.triggerResize(true);
    }

    initMapBounds() {
        this.bounds = {
            east: -70.0,
            west: -125.0,
            north: 50.0,
            south: 30.0
        };
        this.map.triggerResize(true);
    }

    setStores(stores: Store[]) {
        if (stores.length < 1) {
            this.initMapBounds();
        }

        let [latList, lngList] = this.getLatLngLists(stores);

        this.setMapBounds(latList, lngList);
    }

    getLatLngLists(stores: Store[]) {
        let latList = [];
        let lngList = [];

        for (let i = 0; i < stores.length; i++) {
            latList.push(stores[i].location.lat);
            lngList.push(stores[i].location.lng);
        }

        return [latList, lngList];
    }

    setMapBounds(latList, lngList) {
        this.bounds = {
            west: Math.min(...lngList),
            east: Math.max(...lngList),
            south: Math.min(...latList),
            north: Math.max(...latList)
        };
        this.map.triggerResize(true);
    }
}
