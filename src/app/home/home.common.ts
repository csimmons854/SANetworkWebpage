// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';

// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { HomeRoutes } from './home.routes';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>HomeRoutes),
    TranslateModule.forChild()
];

