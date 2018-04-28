import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-top-stores',
    templateUrl: './top-stores.component.html',
    styleUrls: ['./top-stores.component.scss']
})
export class TopStoresComponent implements OnInit {
    view = [525, 300];
    colorScheme = {
        domain: ['#D50000']
    };
    xAxisLabel = 'Trade in Value';
    yAxisLabel = 'Store Name';
    showXAxisLabel = true;
    showYAxisLabel = true;
    showXAxis = true;
    showYAxis = true;

    topStoresData = [
        {
            name: 'Central Texas Marketplace',
            value: 1220.41
        },
        {
            name: 'I35 Bellmead',
            value: 1079.13
        },
        {
            name: 'Lake Air Court',
            value: 980.89
        },
        {
            name: 'Market Place',
            value: 879.1
        },
        {
            name: 'Sparta Rd Belton',
            value: 854.54
        }
    ];

    constructor() {}

    ngOnInit() {}

    tooltipFormat(val) {
        console.log(val);
        return val;
    }
}
