import { Routes } from '@angular/router';
// app

export const HomeRoutes: Routes = [
    {
        path: 'items',
        loadChildren: 'app/+items/items.module#ItemsModule'
    },

];
