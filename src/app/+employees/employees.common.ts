// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { EmployeesRoutes } from './employees.routes';
import { EmployeesComponent } from './components/employees/employees.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    RouterModule.forChild(<any>EmployeesRoutes),
    TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [EmployeesComponent];
