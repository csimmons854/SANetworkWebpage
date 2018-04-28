import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './stores.common';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { StoreService } from './services/store.service';
import { StoresHomeComponent } from './components/stores-home/stores-home.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';

import { StoreFormComponent } from './components/store-form/store-form.component';
import { StoreInfoComponent } from './components/store-detail/store-info/store-info.component';
import { StoreEmployeesComponent } from './components/store-detail/store-employees/store-employees.component';
import {
    StoreAppointmentsComponent,
    AppointmentDialog
} from './components/store-detail/store-appointments/store-appointments.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import {
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarHeaderComponent } from './components/store-detail/store-appointments/calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './components/store-detail/store-appointments/date-time-picker/date-time-picker.component';

import { AgmCoreModule } from '@agm/core';
import { StoresMapComponent } from './components/stores-home/stores-map/stores-map.component';
import { StoresListComponent } from './components/stores-home/stores-list/stores-list.component';
import { SelectedStoreDetailsComponent } from './components/stores-home/selected-store-details/selected-store-details.component';
import { StoreEmployeeListComponent } from './components/store-detail/store-employees/store-employee-list/store-employee-list.component';
import { EmployeeService } from '../+employees/services/employee.service';
import { AddEmployeeComponent } from './components/store-detail/store-employees/add-employee/add-employee.component';
import { EmployeeFormComponent } from '../+employees/components/employee-form/employee-form.component';

import {
    DateAdapter,
    NativeDateAdapter,
    MAT_DATE_FORMATS,
    MAT_NATIVE_DATE_FORMATS
} from '@angular/material';

@NgModule({
    imports: [
        SharedModule,
        ...SHARED_MODULES,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDxFJCbLzKDL63aOsP35ynejhZH31JSBjA'
        }),
        CommonModule,
        FormsModule,
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        NgbModalModule.forRoot(),
        CalendarModule.forRoot(),
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS,
        CreateStoreComponent,
        StoresHomeComponent,
        EditStoreComponent,
        StoreFormComponent,
        StoreDetailComponent,
        StoreInfoComponent,
        StoreEmployeesComponent,
        StoreAppointmentsComponent,
        CalendarHeaderComponent,
        DateTimePickerComponent,
        StoresMapComponent,
        StoreEmployeeListComponent,
        StoresListComponent,
        SelectedStoreDetailsComponent,
        AddEmployeeComponent,
        AppointmentDialog
    ],
    entryComponents: [AppointmentDialog],
    exports: [
        StoreAppointmentsComponent,
        CalendarHeaderComponent,
        DateTimePickerComponent,
        StoresMapComponent,
        StoresListComponent,
        SelectedStoreDetailsComponent,
        StoreEmployeeListComponent,
        AddEmployeeComponent
    ],
    providers: [
        StoreService,
        EmployeeService,
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
    ]
})
export class StoresModule {}
