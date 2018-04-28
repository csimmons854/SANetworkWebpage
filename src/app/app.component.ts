import { Component } from '@angular/core';
// vendor dependencies
import { TranslateService } from '@ngx-translate/core';
// app
import { MenuItem } from './menu/menu.common';

@Component({
    moduleId: module.id,
    selector: 'maestro-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    menuItems: MenuItem[] = [
        {
            title: 'menu.home',
            link: ['/home'],
            icon: 'home',
            tagline: 'Summary'
        },
        {
            title: 'menu.stores',
            link: ['/stores'],
            icon: 'store',
            tagline: 'Store Management'
        },
        {
            title: 'Items',
            link: ['/login'],
            icon: 'shopping_basket',
            tagline: 'item Management'
        },
        {
            title: 'Employees',
            link: ['/employees'],
            icon: 'group',
            tagline: 'Employee Management'
        }
    ];

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
