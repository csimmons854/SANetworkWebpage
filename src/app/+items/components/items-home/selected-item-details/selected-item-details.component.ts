import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../../item';

@Component({
    selector: 'app-selected-item-details',
    templateUrl: './selected-item-details.component.html',
    styleUrls: ['./selected-item-details.component.scss']
})
export class SelectedItemDetailsComponent implements OnInit {
    @Input() item: Item;

    constructor() {}

    ngOnInit() {}
}
