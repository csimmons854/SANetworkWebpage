// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '../common';
// app
import { SharedModule } from '../shared';
import { ItemsComponent } from './components/items/items.component';
import { ItemsRoutes } from './items.routes';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(ItemsRoutes as any),
    TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [ItemsComponent];
