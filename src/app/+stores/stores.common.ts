// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { StoresRoutes } from './stores.routes';
import { StoresComponent } from './components/stores/stores.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>StoresRoutes),
    TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [StoresComponent];
