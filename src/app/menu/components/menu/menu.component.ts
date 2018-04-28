import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// app
import { MenuItem } from '../../interfaces/MenuItem';

@Component({
    moduleId: module.id,
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() items: MenuItem[];
    currentRoute: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.initCurrentRoute();
    }

    initCurrentRoute() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let newRoute = '/';
                let routeSegments = event.url.split('/');
                if (routeSegments.length > 1) {
                    newRoute += routeSegments[1];
                }
                this.currentRoute = newRoute;
            }
        });
    }
}
