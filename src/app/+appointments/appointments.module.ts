import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './appointments.common';
import { AppointmentService } from './services/appointment.service';

import { AgmCoreModule } from '@agm/core';
import { AppointmentsComponent } from './components/appointments/appointments.component';

@NgModule({
    imports: [
        SharedModule,
        ...SHARED_MODULES,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDxFJCbLzKDL63aOsP35ynejhZH31JSBjA'
        })
    ],
    declarations: [...COMPONENT_DECLARATIONS, AppointmentsComponent],
    providers: [AppointmentService]
})
export class AppointmentsModule {}
