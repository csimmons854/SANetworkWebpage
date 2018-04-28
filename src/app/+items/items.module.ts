import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EditItemComponent } from './components/items-home/edit-item/edit-item.component';
import { ItemsHomeComponent } from './components/items-home/items-home.component';
import { ItemsListComponent } from './components/items-home/items-list/items-list.component';
import { SelectedItemDetailsComponent } from './components/items-home/selected-item-details/selected-item-details.component';

import { COMPONENT_DECLARATIONS, SHARED_MODULES } from './items.common';
import { ItemService } from './services/item.service';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/items-home/login/login.component';

@NgModule({
    imports: [
        SharedModule,
        ...SHARED_MODULES,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDxFJCbLzKDL63aOsP35ynejhZH31JSBjA'
        })
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        ItemsListComponent,
        ItemsHomeComponent,
        SelectedItemDetailsComponent,
        EditItemComponent,
        LoginComponent
    ],
    providers: [ItemService]
})
export class ItemsModule {}
