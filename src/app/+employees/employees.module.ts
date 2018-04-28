import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './employees.common';
import { EmployeeService } from './services/employee.service';
import { EmployeesHomeComponent } from './components/employees-home/employees-home.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeInfoComponent } from './components/employee-detail/employee-info/employee-info.component';
import { EmployeeAppointmentsComponent } from './components/employee-detail/employee-appointments/employee-appointments.component';

import { AgmCoreModule } from '@agm/core';
import { EmployeesListComponent } from './components/employees-home/employees-list/employees-list.component';
import { SelectedEmployeeDetailsComponent } from './components/employees-home/selected-employee-details/selected-employee-details.component';
import { StoreService } from 'app/+stores/services/store.service';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

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
        EmployeesHomeComponent,
        EditEmployeeComponent,
        EmployeeFormComponent,
        EmployeeDetailComponent,
        EmployeeInfoComponent,
        EmployeeAppointmentsComponent,
        EmployeesListComponent,
        SelectedEmployeeDetailsComponent,
        CreateEmployeeComponent
    ],
    providers: [EmployeeService, StoreService]
})
export class EmployeesModule {}
