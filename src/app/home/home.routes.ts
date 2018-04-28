import { Routes } from '@angular/router';
// app
import { HomeComponent } from './components/home/home.component';

export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'stores',
        loadChildren: 'app/+stores/stores.module#StoresModule'
    },
    {
        path: 'items',
        loadChildren: 'app/+items/items.module#ItemsModule'
    },
    {
        path: 'employees',
        loadChildren: 'app/+employees/employees.module#EmployeesModule'
    }
];
