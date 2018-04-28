import { Component, Input } from '@angular/core';
import { Store } from '../../../store';

@Component({
    selector: 'app-store-info',
    templateUrl: './store-info.component.html',
    styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent {
    @Input('store') store: Store;
}
