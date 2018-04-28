import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '../../../store';

@Component({
    selector: 'app-stores-list',
    templateUrl: './stores-list.component.html',
    styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
    @Input() stores: Store[];
    @Input() selectedNdx: number;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() viewStore: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    storeSelected(event) {
        this.selectionChange.emit(event.option.value);
    }

    viewStoreClick(event) {
        this.viewStore.emit(event);
    }
}
