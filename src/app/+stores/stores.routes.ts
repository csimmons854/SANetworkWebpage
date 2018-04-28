import { Routes } from '@angular/router';
// app
import { StoresComponent } from './components/stores/stores.component';
import { StoresHomeComponent } from './components/stores-home/stores-home.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';
import { AddEmployeeComponent } from './components/store-detail/store-employees/add-employee/add-employee.component';

export const StoresRoutes = [
    {
        path: '',
        component: StoresComponent,
        children: [
            {
                path: '',
                component: StoresHomeComponent,
                name: 'StoresHome'
            },
            {
                path: 'create',
                component: CreateStoreComponent,
                name: 'CreateStore'
            },
            {
                path: ':id/edit',
                component: EditStoreComponent,
                name: 'EditStore'
            },
            {
                path: ':id',
                component: StoreDetailComponent,
                name: 'StoreDetail'
            },
            {
                path: ':id/add',
                component: AddEmployeeComponent,
                name: 'AddEmployee'
            }
        ]
    }
];
