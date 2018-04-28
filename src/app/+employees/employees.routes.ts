import { Routes } from '@angular/router';
// app
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesHomeComponent } from './components/employees-home/employees-home.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

export const EmployeesRoutes = [
    {
        path: '',
        component: EmployeesComponent,
        children: [
            {
                path: '',
                component: EmployeesHomeComponent,
                name: 'EmployeesHome'
            },
            {
                path: 'create',
                component: CreateEmployeeComponent,
                name: 'CreateEmployee'
            },
            {
                path: ':id/edit',
                component: EditEmployeeComponent,
                name: 'EditEmployee'
            },
            {
                path: ':id',
                component: EmployeeDetailComponent,
                name: 'EmployeeDetail'
            }
        ]
    }
];
