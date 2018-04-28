// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { AppointmentsRoutes } from './appointments.routes';
import { AppointmentsComponent } from './components/appointments/appointments.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>AppointmentsRoutes),
    TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [AppointmentsComponent];
