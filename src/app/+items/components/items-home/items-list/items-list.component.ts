import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from '../../../item';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    @Input() items: Item[];
    @Input() selectedNdx: number;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() toggleDevice: EventEmitter<any> = new EventEmitter<any>();
    @Output() itemDeleted: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    itemSelected(event) {
        this.selectionChange.emit(event.option.value);
    }

    editItemClick(event) {
        this.editItem.emit(event);
    }
    togglePause(event) {
        this.toggleDevice.emit(event);
    }

    delete(event) {
        this.itemDeleted.emit(event);
    }
}
