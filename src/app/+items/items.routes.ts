import { Routes } from '@angular/router';
// app
import { ItemsHomeComponent } from '../+items/components/items-home/items-home.component';
import { ItemsComponent } from './components/items/items.component';

export const ItemsRoutes = [
    {
        path: '',
        component: ItemsComponent,
        children: [
            {
                path: '',
                component: ItemsHomeComponent,
                name: 'ItemsHome'
            }
        ]
    }
];
